import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const client = axios.create();
const server = 'http://localhost:22000/' + 'api/v1/auth/';

let refreshRequest;

client.interceptors.request.use(
	(config) => {
		const token = cookies.get('Authorization');
		if (!token) return config;
		const newConfig = {
			headers: {},
			...config,
		};

		newConfig.headers.Authorization = token;
		return newConfig;
	},
	(e) => Promise.reject(e)
);

client.interceptors.response.use(
	(r) => r,
	async (error) => {
		const refreshToken = cookies.get('refreshToken');
		if (!refreshToken || error.response.status !== 401 || error.config.retry) {
			throw error;
		}

		if (!refreshRequest) {
			refreshRequest = client.post(`${server}refresh`, {
				refreshToken: refreshToken,
			});
		}
		const { data } = await refreshRequest;
		cookies.set('Authorization', data.token);
		cookies.set('refreshToken', data.refreshToken);
		const newRequest = {
			...error.config,
			retry: true,
		};

		return this.client(newRequest);
	}
);

export default client;
