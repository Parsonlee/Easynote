import { useState, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { FormTitle,FormLabel,FormInput,FormBtn,ErrorText } from './Register';
import { validateInput } from '../../utils/loginValidate';
import { login } from '../../utils/requests';
import useThemeModel from '../../models/useThemeModel';
import useAuthModel from '../../models/useAuthModel';

const Login = () => {
	const initValue = {
		username: '',
		password: '',
		errors: {},
		isLoading: false,
	};
	const history = useHistory();
	const { theme } = useThemeModel();
	const { auth, setAuthStatus } = useAuthModel();
	const [value, setValue] = useState(initValue);
	useEffect(() => {
		if (auth) {
			history.push('/userInfo');
		}
	});

	const onChange = (e) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	const isValid = (e) => {
		const { errors, isValid } = validateInput(value);
		if (!isValid) {
			setValue({ ...value, errors });
		}
		return isValid;
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setValue({
			...value,
			isLoading: true,
		});
		if (isValid()) {
			setValue({ ...value, errors: {}, isLoading: true });
			// 登录成功，跳转路由
			login(value).then(
				() => {
					history.push('/note');
					setAuthStatus();
				},
				({ response }) =>
					setValue({ ...value, errors: response.data, isLoading: false })
			);
		}
	};

	const { errors, isLoading } = value;
	return (
		<form
			onSubmit={onSubmit}
			css={css`
				width: 100%;
				height: 100%;
				margin-top: 85px;
				display: flex;
				flex-direction: column;
				align-items: center;
			`}
		>
			<FormTitle theme={theme}>用户登录</FormTitle>
			{typeof errors == 'string' && (
				<ErrorText>{errors}</ErrorText> //错误信息
			)}
			<div>
				<FormLabel theme={theme}>用户名</FormLabel>
				<FormInput
					theme={theme}
					type='text'
					name='username'
					value={value.username}
					onChange={onChange}
					className={errors.username ? 'invalid' : ''} //验证失败时的样式
				/>
				{errors.username && (
					<ErrorText>{errors.username}</ErrorText> //显示错误信息
				)}
			</div>
			<br />
			<div>
				<FormLabel theme={theme}>密码</FormLabel>
				<FormInput
					theme={theme}
					type='password'
					name='password'
					value={value.password}
					onChange={onChange}
					className={errors.username ? 'invalid' : ''} //验证失败时的样式
				/>
				{errors.password && (
					<ErrorText>{errors.password}</ErrorText> //显示错误信息
				)}
			</div>
			<br />
			<FormBtn theme={theme} disabled={isLoading}>
				登录
			</FormBtn>
		</form>
	);
};

export default Login;
