import axios from 'axios';
const server = 'http://localhost:22000/' + 'api/v1/auth/';

export async function register(user) {
	axios
		.post(`${server}register`, { ...user })
		.then((response) => {
			if (response.status === 200) {
				return response;
			}
			return false;
		})
		.catch((err) => {
			return false;
		});
}

export async function login(credentials) {
	axios
		.post(`${server}login`, { ...credentials })
		.then((response) => {
			if (response.status === 200) {
				return response;
			}
			return false;
		})
		.catch((err) => {
			return false;
		});
}
