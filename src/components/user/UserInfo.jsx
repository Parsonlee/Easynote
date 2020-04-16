import { useState, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwtDecode from 'jwt-decode';

import { FormInput, FormBtn, FormLabel, BackBtn } from './Register';
import { logOut, checkUserInfo, updataAvatar } from '../../utils/requests';
import useThemeModel from '../../models/useThemeModel';
import useAuthModel from '../../models/useAuthModel';
import useDataModel from '../../models/useDataModel';

const UserInfo = () => {
	const initInfo = {
		avatar: '',
		username: '',
		password: '',
		email: '',
		phone: '',
	};
	const { theme } = useThemeModel();
	const { setAuthStatus } = useAuthModel();
	const { setData } = useDataModel();
	const [info, setInfo] = useState(initInfo);
	const history = useHistory();

	const { userid } = jwtDecode(localStorage.token);
	const userId = { id: userid };

	// 获取用户信息
	useEffect(() => {
		checkUserInfo(userId).then((response) => {
			setInfo({
				avatar: response.data[0].avatar,
				username: response.data[0].username,
				password: response.data[0].password,
				email: response.data[0].email,
				phone: response.data[0].phone,
			});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const logout = () => {
		logOut();
		setAuthStatus();
		setData([
			{
				contentId: '0',
				category: 'note',
				updateTime: '2020-03-11 00:52',
				title: '🌈🌈😁😁😁',
				description:
					'beatae illum cumque repudiandae corporis iure molestiae tempore.',
				content:
					'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam veritatis sapiente',
			},
		]);
		history.push('/');
	};

	const backToIndex = () => {
		history.push('/');
	};

	const changeAvatar = () => {
		const input = document.querySelector('input[type=file]');
		console.log(input);
		const userAvatar = input.files[0];
		const fileReader = new FileReader();
		fileReader.readAsDataURL(userAvatar);
		fileReader.onload = () => {
			updataAvatar({ userid, avatar: fileReader.result });
			console.log({ userid, avatar: fileReader.result });
			setInfo({ ...info, avatar: fileReader.result });
		};
	};

	return (
		<div
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
			<div
				className='avatar'
				data-text='上传头像'
				css={css`
					width: 80px;
					height: 80px;
					margin-bottom: 10px;
					margin-top: 85px;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					overflow: hidden;
					position: relative;
					&::before {
						position: absolute;
						left: 0;
						top: 0;
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: 100%;
						background-color: rgba(0, 0, 0, 0.3);
						content: attr(data-text);
						transform: translateY(-100%);
						color: whitesmoke;
						font-size: 0.8rem;
					}
					&:hover::before {
						transform: translateY(0);
					}
					.img {
						width: 100%;
						height: 100%;
					}
				`}
			>
				<input
					onChange={changeAvatar}
					type='file'
					accept='image/*'
					css={css`
						position: absolute;
						cursor: pointer;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						opacity: 0;
						width: 3.5rem;
						clear: both;
						display: block;
						margin: auto;
					`}
				/>
				<img src={info.avatar} alt='avatar' className='img' />
			</div>
			<FormLabel theme={theme}>用户名</FormLabel>
			<FormInput
				type='text'
				theme={theme}
				value={info.username}
				name='username'
				readOnly
			/>
			<br />
			<FormLabel theme={theme}>密码</FormLabel>
			<FormInput
				type='text'
				theme={theme}
				value={info.password}
				name='password'
				readOnly
			/>
			<br />
			<FormLabel theme={theme}>邮箱</FormLabel>
			<FormInput
				type='text'
				theme={theme}
				value={info.email}
				name='email'
				readOnly
			/>
			<br />
			<FormLabel theme={theme}>电话</FormLabel>
			<FormInput
				type='text'
				theme={theme}
				value={info.phone}
				name='phone'
				readOnly
			/>
			<br />
			<FormBtn onClick={logout} theme={theme}>
				退出登录
			</FormBtn>
		</div>
	);
};

export default UserInfo;
