import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// 注册
export const userRegisterRequest = (userData) => {
	return axios.post('http://localhost:3100/api/users', userData);
};

// 检查用户名是否存在
export const isUserExist = (username) => {
	return axios.get(`http://localhost:3100/api/users/${username}`, username);
};

// 登录
export const login = (data) => {
	return axios.post('http://localhost:3100/api/login', data).then((res) => {
		const token = res.data;
		localStorage.setItem('jwtToken', token);
		setAuthToken(token); //登录后发送的请求带上token
	});
};

// 退出登录
export const logOut = () => {
	localStorage.removeItem('jwtToken');
	//取消请求头中的信息
	setAuthToken(false);
};

// 查询用户信息
export const checkUserInfo = (userId) => {
	return axios.post('http://localhost:3100/api/userInfo', userId);
};
