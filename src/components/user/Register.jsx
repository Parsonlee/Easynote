import { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

import useThemeModel from '../../models/useThemeModel';
import { userRegisterRequest, isUserExist } from '../../utils/requests';

const Register = () => {
	const initValue = {
		username: '',
		password: '',
		passwordConfirm: '',
		email: '',
		phone: '',
		errors: {},
		isLoading: false,
		invalid: false,
	};
	const history = useHistory();
	const { theme } = useThemeModel();
	const [value, setValue] = useState(initValue);

	const onChange = (e) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setValue({
			...value,
			isLoading: true,
		});
		userRegisterRequest(value).then(
			() => {
				// 显示注册成功信息
				alert('注册成功！');
				history.push('/login'); //跳转到登录
			},
			({ response }) => {
				setValue({ ...value, errors: response.data });
				// console.log(response.data);
				// console.log(value);
			}
		);
	};

	const checkUserExist = (e) => {
		const field = e.target.name;
		const val = e.target.value;
		let invalid;
		if (val !== '') {
			isUserExist(val).then((response) => {
				let errors = value.errors;
				if (response.data[0]) {
					errors[field] = '用户名已存在：' + val;
					invalid = true;
				} else {
					errors[field] = '';
					invalid = false;
				}
				setValue({ ...value, errors, invalid });
			});
		}
	};

	const backToIndex = ()=>{
		history.push('/');
	}

	const { errors, isLoading, invalid } = value;
	return (
		<form
			onSubmit={onSubmit}
			css={css`
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;
			`}
		>
			<BackBtn onClick={backToIndex}>
				<FontAwesomeIcon icon={faChevronCircleLeft} color='gray' />
			</BackBtn>
			<FormTitle theme={theme}>注册新用户</FormTitle>
			<div>
				<FormLabel theme={theme}>用户名：</FormLabel>
				<FormInput
					theme={theme}
					type='text'
					name='username'
					value={value.username}
					onChange={onChange}
					onBlur={checkUserExist}
					className={errors.username ? 'invalid' : ''} //验证失败时的样式
				/>
				{errors.username && (
					<ErrorText>{errors.username}</ErrorText> //显示错误信息
				)}
			</div>
			<br />
			<div>
				<FormLabel theme={theme}>邮箱：</FormLabel>
				<FormInput
					theme={theme}
					type='text'
					name='email'
					value={value.email}
					onChange={onChange}
					className={errors.email ? 'invalid' : ''} //验证失败时的样式
				/>
				{errors.email && (
					<ErrorText>{errors.email}</ErrorText> //显示错误信息
				)}
			</div>
			<br />
			<div>
				<FormLabel theme={theme}>电话：</FormLabel>
				<FormInput
					theme={theme}
					type='text'
					name='phone'
					value={value.phone}
					onChange={onChange}
					className={errors.phone ? 'invalid' : ''} //验证失败时的样式
				/>
				{errors.phone && (
					<ErrorText>{errors.phone}</ErrorText> //显示错误信息
				)}
			</div>
			<br />
			<div>
				<FormLabel theme={theme}>密码：</FormLabel>
				<FormInput
					theme={theme}
					type='password'
					name='password'
					value={value.password}
					onChange={onChange}
					className={errors.password ? 'invalid' : ''} //验证失败时的样式
				/>
				{errors.password && (
					<ErrorText>{errors.password}</ErrorText> //显示错误信息
				)}
			</div>
			<br />
			<div>
				<FormLabel theme={theme}>确认密码：</FormLabel>
				<FormInput
					theme={theme}
					type='password'
					name='passwordConfirm'
					value={value.passwordConfirm}
					onChange={onChange}
					className={errors.passwordConfirm ? 'invalid' : ''} //验证失败时的样式
				/>
				{errors.passwordConfirm && (
					<ErrorText>{errors.passwordConfirm}</ErrorText> //显示错误信息
				)}
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
	margin-top: 105px;
`;
export const FormLabel = styled.label`
	color: ${({ theme }) => theme.color.caption};
	font-size: 0.95rem;
	font-weight: bold;
	display: block;
`;
export const FormInput = styled.input`
	display: block;
	padding: 0.275rem 0.55rem;
	font-size: 1rem;
	color: ${({ theme }) => theme.color.body};
	background-color: #fff;
	border: none;
	border-bottom: 1px solid #9e9e9e;
	outline: none;
	&.invalid {
		border: none;
		border-bottom: 1px solid tomato;
	}
`;
export const FormBtn = styled.button`
	padding: 0.25rem 1rem;
	font-size: 1.25rem;
	line-height: 1.5;
	border-radius: 0.3rem;
	color: ${({ theme }) => theme.button.background};
	cursor: pointer;
	border: 1px solid;
	background: white;
	&:hover {
		filter: brightness(0.97);
	}
`;
export const ErrorText = styled.span`
	display: block;
	font-size: 12px;
	color: tomato;
`;
export const BackBtn = styled.button`
	position: absolute;
	top: 40px;
	width: 40px;
	height: 40px;
	left: 50px;
	outline: none;
	border: none;
	background: whitesmoke;
	border-radius: 50%;
	font-size: 1.3rem;
	cursor: pointer;
	padding: 0;
	&:hover {
		filter: brightness(0.97);
	}
`;
export default Register;
