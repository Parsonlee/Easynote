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
	localStorage.clear();
	//取消请求头中的信息
	setAuthToken(false);
};

// 查询用户信息
export const checkUserInfo = (userId) => {
	return axios.post('http://localhost:3100/api/userInfo', userId);
};

// 修改用户头像
export const updataAvatar = (userData) => {
	return axios.post('http://localhost:3100/api/userAvatar', userData);
};

// 查询用户笔记
export const getNoteData = (userId) => {
	return axios.post('http://localhost:3100/api/note', userId);
};

// 新增笔记
export const newNote = (data) => {
	return axios.post('http://localhost:3100/api/newnote', data);
};

// 修改笔记
export const updateNote = (data) => {
	return axios.post('http://localhost:3100/api/updatenote', data);
};

// 删除笔记
export const deleteNote = (data) => {
	return axios.post('http://localhost:3100/api/deletenote', data);
};
