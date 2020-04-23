import { useState, useEffect, useRef } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import ToolBar from '../toolbar/ToolBar';
import useDataModel from '../../../models/useDataModel';
import useAuthModel from '../../../models/useAuthModel';
import {
	updateTodoTitle,
	getTodo,
	updateTodoContent,
} from '../../../utils/requests';

const TodoPage = () => {
	const initTodo = {};
	const params = useParams();
	const { auth } = useAuthModel();
	const { todo, setTodoData } = useDataModel();
	const [todoList, setTodoList] = useState(initTodo);
	const [finish, setFinish] = useState(false);
	const myInput = useRef();

	useEffect(() => {
		todo.forEach((item) => {
			if (item.contentId.toString() === params.contentId) {
				setTodoList(item);
			}
		});
	});

	const toggleInput = () => {
		myInput.current.className = 'showNewTodo';
		myInput.current.focus();
	};

	const changeTitle = (e) => {
		if (auth) {
			const { userid } = jwtDecode(localStorage.getItem('token'));
			const request = {
				userId: userid,
				id: params.contentId,
				title: e.target.value,
			};
			// console.log(request);
			updateTodoTitle(request);
			getTodo({ userId: userid }).then((response) =>
				setTodoData(response.data)
			);
		}
	};

	const newTodoItem = (e) => {
		e.persist();
		setTodoList((prevState) => {
			let newState = {};
			newState = prevState;
			if (e.target.value) {
				newState.content.push(e.target.value);
			}
			return newState;
		});
		if (auth) {
			const { userid } = jwtDecode(localStorage.getItem('token'));
			const request = {
				userId: userid,
				id: params.contentId,
				content: todoList.content.join('&'),
			};
			updateTodoContent(request);
			getTodo({ userId: userid }).then((response) =>
				setTodoData(response.data)
			);
		}
		myInput.current.className = 'notShow';
	};

	const checked = () => {
		setFinish(true);
	};
	// const handleEnterKey = (e) => {
	// 	if (e.nativeEvent.keyCode === 13) {
	// 		newTodoItem(e);
	// 	}
	// };

	return (
		<div
			css={css`
				position: relative;
				background: #ffffff;
				width: 100%;
				height: 100%;
				padding: 10px 65px;
				outline: none;
				.title {
					border: none;
					border-bottom: 2px solid whitesmoke;
					font-size: 2rem;
					display: block;
					padding: 0 4px;
					margin-bottom: 5px;
				}
				.time {
					font-size: 0.8rem;
					color: #ccc;
				}
				.notShow {
					display: none;
				}
				.showNewTodo {
					display: block;
					border: none;
					border-bottom: 1px solid #2dca70;
					outline: none;
					padding-left: 4px;
				}
			`}
		>
			<ToolBar
				category='todo'
				toggleInput={toggleInput}
				css={css`
					position: absolute;
					right: 20px;
					bottom: 40px;
				`}
			/>
			<input
				type='text'
				className='title'
				defaultValue={todoList.title || ''}
				onBlur={changeTitle}
			/>
			<p className='time'>{todoList.updateTime}</p>
			<input
				type='text'
				onBlur={newTodoItem}
				ref={myInput}
				className='notShow'
				// onKeyPress={(e) => handleEnterKey(e)}
			/>
			<div>
				<ul
					css={css`
						padding-inline-start: 0;
						list-style: none;
						font-size: 1.2rem;
						.item {
							padding: 3px;
							display: inline-block;
						}
						.custom-checkbox span {
							background-color: white;
							border-radius: 5px;
							border: 1px solid #d3d3d3;
							width: 20px;
							height: 20px;
							display: inline-block;
							text-align: center;
							vertical-align: middle;
							line-height: 20px;
							position: relative;
						}
						.custom-checkbox input[type='checkbox'] {
							display: none;
						}
						.custom-checkbox input[type='checkbox']:checked + span {
							border: none;
						}
						.custom-checkbox input[type='checkbox']:checked + span:after {
							position: absolute;
							right: -8px;
							top: -6px;
							content: url(https://i.loli.net/2020/04/24/J5fFsN8jMh7xSkT.png);
						}
					`}
				>
					{todoList.content &&
						todoList.content.map((item, i) => (
							<p key={i}>
								<label className='custom-checkbox'>
									<input type='checkbox' onClick={checked} />
									<span></span>
									&nbsp;&nbsp;
									<li className='item'>{item}</li>
								</label>
							</p>
						))}
				</ul>
			</div>
		</div>
	);
};

export default TodoPage;
