import axios from 'axios';

const server = 'http://localhost:22000/' + 'api/v1/auth/';

export function register(user) {
	return axios.post(`${server}register`, {  ...user  });
}
