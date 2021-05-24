import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import Cookies from 'universal-cookie';

import client from '../api/client';
const cookies = new Cookies();

const authContext = createContext();
const server = 'http://localhost:22000/' + 'api/v1/auth/';

export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
};

const lsUser = JSON.parse(localStorage.getItem('user')) || null;

const useProvideAuth = () => {
	const [user, setUser] = useState(lsUser);

	const login = async ({ email, password }) => {
		return axios
			.post(`${server}login`, { email, password })
			.then((response) => {
				if (response.status === 200) {
					const { user, token, refreshToken } = response.data;
					localStorage.setItem('user', JSON.stringify(user));
					setUser(user);
					cookies.set('Authorization', token);
					cookies.set('refreshToken', refreshToken);
					return user;
				}
				return false;
			})
			.catch((err) => {
				console.error(err);
				return false;
			});
	};

	const logout = async () => {
		return client
			.post(`${server}logout`)
			.then((response) => {
				if (response.status === 200) {
					localStorage.removeItem('user');
					cookies.remove('Authorization')
					cookies.remove('refreshToken')
					setUser(null);
					return true;
				}
				return false;
			})
			.catch((err) => {
				console.error(err);
				return false;
			});
	};

	return {
		user,
		login,
		logout,
	};
};
