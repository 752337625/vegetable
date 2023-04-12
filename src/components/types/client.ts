export interface User {
	id: string | number;
	name: string;
	desc: string;
	socket: string;
}
export interface Message {
	id: string | number;
	message: string;
	center: boolean;
}
