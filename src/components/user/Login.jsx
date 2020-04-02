import { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { validateInput } from '../../utils/loginValidate';
import useThemeModel from '../../models/useThemeModel';
import { FormTitle, FormLabel, FormInput, FormBtn } from './Register';

const Login = () => {
	const initState = {
		username: '',
		password: '',
		errors: {},
		isLoading: false
	};
	const { theme } = useThemeModel();
	const [state, setState] = useState(initState);
	const history = useHistory();

	const onChange = e => {
		setState({ [e.target.name]: e.target.value });
	};

	const isValid = e => {
		const { errors, isValid } = validateInput(state);
		if (!isValid) {
			setState({ errors });
		}
		return isValid;
	};

	const onSubmit = e => {
		e.preventDefault();
		if (isValid()) {
			setState({ errors: {}, isLoading: true });
			// 登录成功，跳转路由
			this.props.login(state).then(
				res => history.push('/note'),
				({ res }) => setState({ errors: res.data, isLoading: false })
			);
		}
	};

	const { errors, username, password, isLoading } = state;
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
			{/* {typeof errors == 'string' && (
				<div className='alert-danger'>{errors}</div> //错误信息
			)} */}
			<div>
				<FormLabel theme={theme}>用户名</FormLabel>
				<br />
				<FormInput
					theme={theme}
					type='text'
					name='text'
					value={username}
					onChange={onChange}
					// className={errors.username ? 'error' : ''}
				/>
				{/* {errors.username && (
					<span className='erros-text'>{errors.username}</span> //显示错误信息
				)} */}
			</div>
			<br />
			<div>
				<FormLabel theme={theme}>密码</FormLabel>
				<br />
				<FormInput
					theme={theme}
					type='password'
					name='password'
					value={password}
					onChange={onChange}
					// className={errors.password ? 'error' : ''}
				/>
				{/* {errors.password && (
					<span className='erros-text'>{errors.username}</span> //显示错误信息
				)} */}
			</div>
			<br />
			<FormBtn theme={theme} disabled={isLoading}>
				登录
			</FormBtn>
		</form>
	);
};

export default Login;
