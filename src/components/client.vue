<template>
	<div class="client-app">
		<div class="right">
			<div class="right-top">
				<ul class="infinite-list">
					<li
						v-for="i in messageList"
						:key="i.id"
						:class="[
							'infinite-list-item',
							i.center ? 'infinite-list-item-left' : 'infinite-list-item-right',
						]">
						<img v-if="i.center" src="./assets/client-0.jpg" width="40" height="40" />
						<img v-if="!i.center" src="./assets/client-1.jpg" width="40" height="40" />
						<p> {{ i.message }}</p>
					</li>
				</ul>
			</div>
			<div class="right-bottom">
				<div class="right-fn">
					<el-tooltip class="box-item" effect="dark" content="暂未开发" placement="top">
						<el-icon><CameraFilled /></el-icon>
					</el-tooltip>
					<el-tooltip class="box-item" effect="dark" content="暂未开发" placement="top">
						<el-icon><PictureFilled /></el-icon>
					</el-tooltip>
					<el-icon @click="clickVideoHandle(true)"><VideoCameraFilled /></el-icon>
				</div>
				<el-input v-model="message" type="textarea" resize="none" />
				<div class="right-button"> <el-button type="primary">发送</el-button> </div>
			</div>
		</div>
		<div :class="['stream-p']">
			<el-icon v-if="videoShow" class="close-icon" @click="clickVideoHandle(false)"
				><Close
			/></el-icon>
			<div :class="['stream-video-d']">
				<video
					id="local"
					:class="[videoShow ? 'stream-p-active' : 'stream-p-active-reverse']"
					autoplay></video>
				<video
					id="remote"
					:class="[videoShow ? 'stream-p-active' : 'stream-p-active-reverse']"
					autoplay></video>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import { PictureFilled, CameraFilled, Close, VideoCameraFilled } from '@element-plus/icons-vue';
	import { ElTooltip, ElInput, ElIcon, ElButton } from 'element-plus';
	import { ref, nextTick } from 'vue';
	import { Message } from './types/client';
	import type { Ref } from 'vue';
	import { configuration } from './webrtc/cinfig';
	import { createdsocket } from './socket';
	let socket = createdsocket();
	let videoShow: Ref<boolean> = ref(false);
	let message: Ref<string> = ref('');
	let messageList: Ref<Array<Message>> = ref([]);
	let localStream: MediaStream | null = null;
	let localPC = new window.RTCPeerConnection(configuration);
	let remotePC = new window.RTCPeerConnection(configuration);
	let pcRemoteMediaStream: MediaStream | null = null;
	let pcLocalMediaStream: MediaStream | null = null;
	let localFn = () => {
		let local = localPC;
		// 收集候选者
		local.onicecandidate = _ev => {
			if (_ev.candidate) {
				socket.emit('LocalCandidate', _ev.candidate);
			} else {
				console.log('候选者收集结束，没有候选者收集了。');
			}
		};
		// 接收远端来的流轨道或者流
		local.ontrack = _ev => {
			let remote: HTMLVideoElement = document.getElementById('remote') as HTMLVideoElement;
			if (_ev.streams && _ev.streams[0]) {
				remote.srcObject = _ev.streams[0];
			} else {
				if (!pcRemoteMediaStream) {
					pcRemoteMediaStream = new MediaStream();
					remote.srcObject = pcRemoteMediaStream;
				}
				pcRemoteMediaStream.addTrack(_ev.track);
			}
		};
	};
	localFn();
	let remoteFn = () => {
		let local = remotePC;
		// 收集候选者
		local.onicecandidate = _ev => {
			if (_ev.candidate) {
				socket.emit('RemoteCandidate', _ev.candidate);
			} else {
				console.log('候选者收集结束，没有候选者收集了。');
			}
		};
		// 接收远端来的流轨道或者流
		local.ontrack = _ev => {
			let remote: HTMLVideoElement = document.getElementById('remote') as HTMLVideoElement;
			if (_ev.streams && _ev.streams[0]) {
				remote.srcObject = _ev.streams[0];
			} else {
				if (!pcLocalMediaStream) {
					pcLocalMediaStream = new MediaStream();
					remote.srcObject = pcLocalMediaStream;
				}
				pcLocalMediaStream.addTrack(_ev.track);
			}
		};
	};
	remoteFn();
	let call = () => {
		localPC.createOffer().then(offer => {
			localPC.setLocalDescription(offer);
			socket.emit('LocalDescription', offer);
		});
	};
	// 远端数据本地设置
	socket.on('LocalDescriptionFn', data => {
		localPC.setRemoteDescription(data);
	});
	socket.on('LocalCandidateFn', data => {
		localPC.addIceCandidate(data);
	});
	// 本地数据远端设置
	socket.on('RemoteDescriptionFn', async data => {
		remotePC.setRemoteDescription(data).then(() => {
			remotePC.createAnswer().then(answer => {
				remotePC.setLocalDescription(answer);
				socket.emit('RemoteDescription', answer);
			});
		});
	});
	socket.on('RemoteCandidateFn', data => {
		remotePC.addIceCandidate(data);
	});
	socket.on('createAnswer', () => {
		console.log(1);
		videoShow.value = true;
		nextTick(() => {
			navigator.mediaDevices
				.getUserMedia({ video: true, audio: true })
				.then((stream: MediaStream) => {
					let local: HTMLVideoElement = document.getElementById('local') as HTMLVideoElement;
					local.srcObject = stream;
					stream.getTracks().forEach(track => {
						remotePC.addTrack(track);
					});
				});
		});
	});
	// 获取摄像头，断开连接
	let clickVideoHandle = (flag: boolean) => {
		videoShow.value = flag;
		if (flag) {
			//打开本地视频，同时通知远端
			socket.emit('Answer');
			nextTick(() => {
				navigator.mediaDevices
					.getUserMedia({ video: true, audio: true })
					.then((stream: MediaStream) => {
						let local: HTMLVideoElement = document.getElementById('local') as HTMLVideoElement;
						local.srcObject = stream;
						stream.getTracks().forEach(track => {
							localPC.addTrack(track);
						});
						call();
					});
			});
		} else {
			(localStream as MediaStream).getTracks().forEach((track: MediaStreamTrack) => {
				track.stop();
			});
			localStream = null;
		}
	};
</script>
<style scoped lang="less">
	.stream-p {
		position: absolute;
		z-index: 2;
		right: 1px;
		top: 1px;

		.close-icon {
			position: absolute;
			z-index: 10;
			right: 0;
			color: #ccc;
			border-radius: 50%;
			cursor: pointer;
		}
		.stream-video-d {
			position: relative;
			display: inline-block;
			video {
				object-fit: cover;
			}
			#local {
				&.stream-p-active-reverse {
					height: 0;
					width: 0;
					animation: localtranslateY 0.3s ease;
				}
				&.stream-p-active {
					height: 398px;
					width: 280px;
					animation: localtranslateX 0.3s ease;
				}
			}
			#remote {
				position: absolute;
				border-left: 0;
				left: 0;
				&.stream-p-active-reverse {
					height: 0;
					width: 0;
					animation: remotetranslateY 0.3s ease;
				}
				&.stream-p-active {
					height: 150px;
					width: 100px;
					animation: remotetranslateX 0.3s ease;
				}
			}
			@keyframes remotetranslateX {
				from {
					height: 0;
					width: 0;
				}
				to {
					height: 150px;
					width: 100px;
				}
			}
			@keyframes remotetranslateY {
				from {
					height: 150px;
					width: 100px;
				}
				to {
					height: 0;
					width: 0;
				}
			}
			@keyframes localtranslateX {
				from {
					height: 0;
					width: 0;
				}
				to {
					height: 398px;
					width: 280px;
				}
			}
			@keyframes localtranslateY {
				from {
					height: 398px;
					width: 280px;
				}
				to {
					height: 0;
					width: 0;
				}
			}
			#local,
			#remote {
				margin: 0;
				background: #fff;
				border: 1px solid rgba(204, 204, 204, 0.6);
			}
		}
	}
	.client-app {
		display: flex;
		background-color: rgba(245, 245, 245, 1);
		position: relative;
		// min-width: 740px;
		height: 602px;

		ul {
			padding: 0;
			margin: 0;
			list-style: none;
		}
		.right {
			width: 100%;
			// min-width: 740px;
			height: 100%;
			border: 1px solid;
			.right-top {
				width: 100%;
				height: 400px;
				box-sizing: border-box;

				.infinite-list {
					height: 100%;
					overflow-x: hidden;
				}
				.infinite-list .infinite-list-item {
					display: flex;
					color: #000;
					padding: 5px;
					margin-bottom: 5px;
					p {
						max-width: 250px;
						margin: 0 6px 0 6px;
						padding: 5px;
						word-break: break-word;
						border-radius: 4px;
					}
					&.infinite-list-item-left {
						p {
							background-color: #fff;
						}
					}
					&.infinite-list-item-right {
						flex-direction: row-reverse;
						p {
							background-color: rgba(149, 236, 105, 1);
						}
					}
				}
			}
			.right-bottom {
				width: 100%;
				height: 200px;
				border-top: 1px solid;

				.right-fn {
					height: 30px;
					font-size: 18px;
					line-height: 30px;
					text-align: right;
					border-bottom: 1px solid;
					.el-icon {
						cursor: pointer;
						margin: 0px 5px;
						&:hover {
							color: #409eff;
						}
					}
				}
				:deep(.el-textarea) {
					height: 125px;
					.el-textarea__inner {
						height: 125px;
						box-shadow: none;
						border-radius: 0;
					}
				}
				.right-button {
					border-top: 1px solid;
					height: 40px;
					line-height: 36px;
					text-align: right;
					padding-right: 5px;
				}
			}
		}
	}
</style>
