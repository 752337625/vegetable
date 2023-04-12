import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';
/**
 *UUID
 */
const createGuid = () => {
	return 'xxxxxxxx-xxxx-8xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(17);
	});
};
const initFn = (socket: Socket) => {
	// 连接成功
	socket.on('connect', () => {
		console.log(socket.id, '监听客户端连接成功-connect');
	});
	// 断开连接
	socket.on('disconnect', reason => {
		console.log(socket.connected);
		console.log('断开连接-disconnect', reason);
	});
	// 错误
	socket.on('error', err => {
		console.log('错误-error', err);
	});
	// 连接错误
	socket.on('connect_error', err => {
		console.log('连接错误-connect_error', err);
	});
	// 连接超时
	socket.on('connect_timeout', data => {
		console.log('连接超时-connect_timeout', data);
	});
	// 重连成功
	socket.on('reconnect', attemptNumber => {
		// 重连尝试次数
		console.log('重连成功-reconnect', attemptNumber);
	});
	// 尝试重连时触发
	socket.on('reconnect_attempt', attemptNumber => {
		// 重连尝试次数
		console.log('尝试重连-reconnect_attempt', attemptNumber);
	});
	// 在尝试重新连接时触发
	socket.on('reconnecting', attemptNumber => {
		// 重连尝试次数
		console.log('正在尝试重连-reconnecting', attemptNumber);
	});
	// 重连尝试错误
	socket.on('reconnect_error', err => {
		console.log(socket.connected);
		console.log('重连尝试错误-reconnect_error', err);
	});
	// 客户端不能重连时触发
	socket.on('reconnect_failed', () => {
		console.log('客户端不能连接-reconnect_failed');
	});
	// 当一个ping被发送到服务器时触发
	socket.on('ping', () => {
		console.log('一个ping发送到服务器-ping');
	});
	// 当服务器收到pong时触发
	socket.on('pong', data => {
		// data: 延迟多少ms
		console.log('服务器收到pong-pong', data);
	});
};
const createdsocket = () => {
	let url = '';
	if (__VUEPRESS_DEV__) {
		url = 'http://127.0.0.1:9098';
	} else {
		url = 'https://www.luosifa.top';
	}
	const socket: Socket = io(url, {
		transports: ['websocket'],
	});
	initFn(socket);
	return socket;
};

export { createdsocket, createGuid };
