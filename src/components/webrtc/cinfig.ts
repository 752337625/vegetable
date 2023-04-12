const configuration: RTCConfiguration = {
	iceServers: [
		{
			urls: 'turn:www.luosifa.top:3478',
			username: 'admin',
			credential: '123456',
		},
		{
			urls: ['stun:www.luosifa.top:3478'],
		},
	],
};

export { configuration };
