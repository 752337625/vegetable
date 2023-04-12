<template>
	<div id="app" class="root">
		<div class="content">
			<!--操作-->
			<div class="operation">
				<el-button type="primary" round @click="callCamera">开启摄像头</el-button>
				<el-button round @click="closeCamera">关闭摄像头</el-button>
				<el-button type="primary" round @click="photograph">拍照</el-button>
				<el-button round @click="clearCanvas($refs['photoCanvas'])">删除照片</el-button>
			</div>

			<div class="operation">
				镜像：
				<el-switch v-model="isFlipHorizontal" />
				<el-radio-group v-model="radio" style="margin: 0px 40px" @change="switchVideoMode">
					<el-radio :label="1">默认</el-radio>
					<el-radio :label="2">背景虚化</el-radio>
					<el-radio :label="3">背景替换</el-radio>
				</el-radio-group>
				<el-radio-group v-if="radio === 2" v-model="backgroundBlurAmount" style="margin: 0 20px">
					<el-radio :label="20">高</el-radio>
					<el-radio :label="10">中</el-radio>
					<el-radio :label="3">低</el-radio>
				</el-radio-group>
			</div>

			<!-- 背景图片区 -->
			<div v-if="radio === 3" style="display: flex; margin-top: 20px">
				<el-radio-group
					v-model="bcRadio"
					style="display: flex; align-items: center"
					@change="switchBackground">
					<el-radio-button v-for="(item, i) in imgUrlArray" :key="item" :label="i">
						<img :ref="'img' + i" class="bc-img" :src="item" />
					</el-radio-button>
				</el-radio-group>
			</div>

			<!-- 视频区 -->
			<div class="container">
				<div style="text-align: center">
					原始视频
					<div class="video">
						<video
							ref="video"
							style="border: 1px solid"
							:class="{ flipHorizontal: isFlipHorizontal }"
							width="300"
							height="300"
							autoplay></video>
					</div>
				</div>
				<div style="text-align: center">
					结果视频
					<div class="video">
						<canvas
							id="videoCanvas"
							style="border: 1px solid"
							:class="{ flipHorizontal: isFlipHorizontal }"
							width="300"
							height="300"></canvas>
					</div>
				</div>
			</div>
			<!-- 照片 -->
			<div class="container">
				<div style="text-align: center">
					相片
					<div class="video">
						<canvas ref="photoCanvas" width="300" height="300" style="border: 1px solid"></canvas>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { ElButton, ElSwitch, ElRadioGroup, ElRadio } from 'element-plus';
</script>
<script>
	import * as bodySegmentation from '@tensorflow-models/body-segmentation';
	import '@tensorflow/tfjs-core';
	import '@tensorflow/tfjs-converter';
	// Register WebGL backend.
	import '@mediapipe/selfie_segmentation';
	import '@tensorflow/tfjs-backend-webgl';
	export default {
		name: 'App',
		data() {
			return {
				model: {
					architecture: 'MobileNetV1',
					outputStride: 16,
					multiplier: 0.75,
					quantBytes: 2,
				},
				isFlipHorizontal: false, // 是否水平翻转(镜像)
				radio: 1,
				bcRadio: 0,
				videoCanvas: null, // 处理后的视频帧的绘制区域
				segmenter: null,
				backgroundImg: null,
				flipHorizontal: false, // 是否水平翻转
				backgroundBlurAmount: 10, // 背景虚化程度 0~20
				edgeBlurAmount: 3, // 边缘模糊
				imgUrlArray: [
					'https://static.yximgs.com/udata/pkg/y-tech-open-platform/common/2ed5edc1a56e353bf8dabdabb640480e.jpeg',
					'https://static.yximgs.com/udata/pkg/y-tech-open-platform/common/d842f4673127224d42a84b9a9684f07f.jpeg',
					'https://static.yximgs.com/udata/pkg/y-tech-open-platform/common/dea36ed8b7756727351a94f197b0daad.jpeg',
					'https://static.yximgs.com/udata/pkg/y-tech-open-platform/common/ed83312458fa92498baacff647537f90.jpeg',
				],
			};
		},
		mounted() {
			// 加载模型
			this.loadAndPredict(this.model);
			this.videoCanvas = document.getElementById('videoCanvas');
			// 加载背景图
			this.backgroundImg = new Image();
			this.backgroundImg.src = this.imgUrlArray[this.bcRadio];
			this.backgroundImg.setAttribute('crossOrigin', 'Anonymous');
		},
		methods: {
			// 开启摄像头
			async callCamera() {
				navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
					this.isOpen = true;
					this.$refs['video'].onloadeddata = () => {
						this.switchVideoMode(); // 判断处于哪种模式
					};
					this.$refs['video'].srcObject = stream;
				});
			},
			// 拍照
			photograph() {
				let ctx = this.$refs['photoCanvas'].getContext('2d');
				ctx.drawImage(this.$refs['video'], 0, 0, 320, 240);
			},
			// 清空canvas
			clearCanvas(obj) {
				obj.getContext('2d').clearRect(0, 0, obj.width, obj.height);
			},

			// 切换模式
			switchVideoMode() {
				switch (this.radio) {
					case 1:
						this.clearCanvas(this.videoCanvas);
						break;
					case 2:
						this.blurBackground(); // 虚化背景
						break;
					case 3:
						this.replaceBackground(); // 背景替换
				}
			},
			// 切换背景图
			switchBackground() {
				this.backgroundImg.src = this.imgUrlArray[this.bcRadio];
			},
			// 2虚化背景
			async blurBackground() {
				if (!this.isOpen) return;
				const video = this.$refs['video']; // 获取视频帧
				const segmentation = await this.segmenter.segmentPeople(video, {
					multiSegmentation: true,
					segmentBodyParts: false,
				});
				bodySegmentation.drawBokehEffect(
					this.videoCanvas,
					video,
					segmentation,
					this.backgroundBlurAmount,
					this.edgeBlurAmount,
					this.flipHorizontal,
				);
				if (this.radio === 2) {
					requestAnimationFrame(this.blurBackground);
				} else {
					this.clearCanvas(this.videoCanvas);
				}
			},
			// 3背景替换
			async replaceBackground() {
				if (!this.isOpen) return;
				const img = this.$refs['video'];
				const segmentation = await this.segmenter.segmentPerson(img);
				const foregroundColor = { r: 0, g: 0, b: 0, a: 0 };
				const backgroundColor = { r: 0, g: 0, b: 0, a: 255 };
				let backgroundDarkeningMask = bodySegmentation.toMask(
					segmentation,
					foregroundColor,
					backgroundColor,
				);
				if (backgroundDarkeningMask) {
					let context = this.videoCanvas.getContext('2d');
					// 合成
					context.putImageData(backgroundDarkeningMask, 0, 0);
					context.globalCompositeOperation = 'source-in'; // 新图形只在重合区域绘制
					context.drawImage(
						this.backgroundImg,
						0,
						0,
						this.videoCanvas.width,
						this.videoCanvas.height,
					);
					context.globalCompositeOperation = 'destination-over'; // 新图形在画布内容后面绘制
					context.drawImage(img, 0, 0, this.videoCanvas.width, this.videoCanvas.height);
					context.globalCompositeOperation = 'source-over'; // 恢复
				}
				if (this.radio === 3) {
					requestAnimationFrame(this.replaceBackground);
				} else {
					this.clearCanvas(this.videoCanvas);
				}
			},
			// 关闭摄像头
			closeCamera() {
				if (!this.$refs['video'].srcObject) return (this.dialogCamera = false);
				let stream = this.$refs['video'].srcObject;
				let tracks = stream.getTracks();
				tracks.forEach(track => {
					track.stop();
				});
				this.$refs['video'].srcObject = null;
				this.clearCanvas(this.videoCanvas);
			},
			async loadAndPredict() {
				const segmenterConfig = {
					architecture: 'MobileNetV1',
					//ResNet架构支持步幅16、32，MobileNetV1架构支持步距8和16）。它指定BodyPix模型的输出步幅。值越小，输出分辨率越大，以速度为代价的模型越精确。值越大，模型越小，预测时间越快，但精度越低。
					outputStride: 8,
					//乘数-可以是1.0、0.75或0.50之一（该值仅由MobileNetV1体系结构使用，而不由ResNet体系结构使用）。它是所有卷积运算的深度（通道数）的浮点乘数。值越大，层的大小就越大，以速度为代价的模型就越精确。较小的值导致较小的模型和较快的预测时间，但精度较低。
					multiplier: 0.75,
					//1,2,4  此参数控制用于权重量化的字节
					// '4. 每个浮点数 4 个字节（无量化）。最高精度&原始模型尺寸',
					// '2. 每个浮点数 2 个字节。精度略低，模型尺寸减小 2 倍',
					//'1. 每个浮点数 1 个字节。精度降低, 模型尺寸减少 4 倍'
					quantBytes: 4,
				};
				//加载模型
				this.segmenter = await bodySegmentation.createSegmenter(
					bodySegmentation.SupportedModels.BodyPix,
					segmenterConfig,
				);
			},
		},
	};
</script>
<style>
	.operation {
		display: flex;
		align-items: center;
		margin-top: 20px;
	}
	.container {
		margin-top: 20px;
		display: flex;
	}
	.video {
		padding: 20px;
	}
	.bc-img {
		width: 144px;
		height: 108px;
	}
	.flipHorizontal {
		transform: rotateY(180deg);
	}
</style>
