import { useState, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { FormInput, FormBtn, FormLabel } from './Register';
import { logOut, checkUserInfo } from '../../utils/requests';
import useThemeModel from '../../models/useThemeModel';
import useAuthModel from '../../models/useAuthModel';

const UserInfo = () => {
	const initInfo = {
		avatar: '',
		username: '',
		password: '',
		email: '',
		phone: ''
	};
	const { auth, setAuthStatus } = useAuthModel();
	const [info, setInfo] = useState(initInfo);
	const history = useHistory();
	const { theme } = useThemeModel();
	useEffect(() => {
		const { id } = jwtDecode(localStorage.jwtToken);
		const userId = { id: id };
		checkUserInfo(userId).then((response) => {
			console.log(response.data);
			setInfo({
				avatar: response.data[0].avatar,
				username: response.data[0].username,
				password: response.data[0].password,
				email: response.data[0].email,
				phone: response.data[0].phone
			});
		});
	}, []);

	const logout = () => {
		logOut();
		setAuthStatus();
		history.push('/');
	};
	return (
		<div css={css`
			width: 100%;
			height: 100%;
			margin-top: 85px;
			display: flex;
			flex-direction: column;
			align-items: center;
		`}>
			<button css={css`outline: none;border:none;`}>{auth ? '😁' : '😢'}</button>
			<img
				src={info.avatar}
				alt='avatar'
				css={css`
					width: 80px;
					height: 80px;
				`}
			/>
			<FormLabel theme={theme}>用户名</FormLabel>
			<FormInput
				type='text'
				theme={theme}
				value={info.username}
				name='username'
				readOnly
			/>
			<br/>
			<FormLabel theme={theme}>密码</FormLabel>
			<FormInput
				type='text'
				theme={theme}
				value={info.password}
				name='password'
				readOnly
				/>
			<br/>
			<FormLabel theme={theme}>邮箱</FormLabel>
			<FormInput
				type='text'
				theme={theme}
				value={info.email}
				name='email'
				readOnly
			/>
			<br/>
			<FormLabel theme={theme}>电话</FormLabel>
			<FormInput
				type='text'
				theme={theme}
				value={info.phone}
				name='phone'
				readOnly
			/>
			<br/>
			<FormBtn onClick={logout} theme={theme}>
				退出登录
			</FormBtn>
		</div>
	);
};

export default UserInfo;
