import { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

import useThemeModel from '../../models/useThemeModel';

const Register = () => {
	const initState = {
		username: '',
		password: '',
		passwordConfirm: '',
		errors: {},
		isLoading: false,
		invalid: false
	};
	const history = useHistory();
	const { theme } = useThemeModel();
	const [state, setState] = useState(initState);

	const onChange = e => {
		setState({ [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		// redux写法，待修改
		// this.props.registerAction.userRegisterRequest(state).then(
		// 	() => {
		// 		// 显示注册成功信息
		// 		history.push('/login'); //跳转到登录
		// 	},
		// 	({ response }) => setState({ errors: response.data, isLoading: false })
		// );
	};

	const checkUserExist = e => {
		const field = e.target.name;
		const val = e.target.value;
		let invalid;
		if (val !== '') {
			// redux写法，待修改
			// this.props.registerAction.isUserExist(val).then(response => {
			// 	let errors = state.errors;
			// 	if (response.data[0]) {
			// 		errors[field] = '用户名已存在：' + val;
			// 		invalid = true;
			// 	} else {
			// 		errors[field] = '';
			// 		invalid = false;
			// 	}
			// 	setState({ errors, invalid });
			// });
		}
	};

	const { errors, isLoading, invalid } = state;
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
			<FormTitle theme={theme}>注册新用户</FormTitle>
			<div>
				<FormLabel theme={theme}>用户名：</FormLabel>
				<br />
				<FormInput
					theme={theme}
					type='text'
					name='username'
					value={state.username}
					onChange={onChange}
					onBlur={checkUserExist}
					// className={errors.username ? 'invalid' : ''}  //验证失败时的样式
				/>
				{/* {errors.username && (
					<span className='erros-text'>{errors.username}</span> //显示错误信息
				)} */}
			</div>
			<br />
			<div>
				<FormLabel theme={theme}>密码：</FormLabel>
				<br />
				<FormInput
					theme={theme}
					type='password'
					name='password'
					value={state.password}
					onChange={onChange}
					// className={errors.password ? 'invalid' : ''}  //验证失败时的样式
				/>
				{/* {errors.password && (
					<span className='erros-text'>{errors.password}</span> //显示错误信息
				)} */}
			</div>
			<br />
			<div>
				<FormLabel theme={theme}>确认密码：</FormLabel>
				<br />
				<FormInput
					theme={theme}
					type='password'
					name='passwordConfirm'
					value={state.passwordConfirm}
					onChange={onChange}
					// className={errors.passwordConfirm ? 'invalid' : ''} //验证失败时的样式
				/>
				{/* {errors.passwordConfirm && (
					<span className='erros-text'>{errors.passwordConfirm}</span>  //显示错误信息
				)} */}
			</div>
			<br />
			<FormBtn disabled={isLoading || invalid} theme={theme}>
				注册
			</FormBtn>
		</form>
	);
};
export const FormTitle = styled.h1`
	color: ${({ theme }) => theme.primary.base};
`;
export const FormLabel = styled.label`
	color: ${({ theme }) => theme.color.caption};
	font-size: 0.85rem;
`;
export const FormInput = styled.input`
	padding: 0.275rem 0.55rem;
	font-size: 1rem;
	color: ${({ theme }) => theme.color.body};
	background-color: #fff;
	border: 1px solid #ced4da;
	border-radius: 0.25rem;
	&.invalid {
		border: 1px solid red;
	}
`;

export const FormBtn = styled.button`
	padding: 0.25rem 1rem;
	font-size: 1.25rem;
	line-height: 1.5;
	border-radius: 0.3rem;
	color: ${({ theme }) => theme.button.background};
  cursor: pointer;
	&:hover{
		filter:brightness(.97);
	}
`;
export default Register;
