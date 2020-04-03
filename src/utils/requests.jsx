import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// 注册
export const userRegisterRequest = userData => {
	return axios.post('http://localhost:3100/api/users', userData);
};

export const isUserExist = username => {
	return axios.get(`http://localhost:3100/api/users/${username}`, username);
};

// 登录
export const login = data => {
	return axios.post('http://localhost:3100/api/login', data).then(res => {
		const token = res.data;
		localStorage.setItem('jwtToken', token);
		setAuthToken(token);
	});
};
