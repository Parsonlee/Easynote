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
	const initTodoList = {};
	const params = useParams();
	const { auth } = useAuthModel();
	const { todo, setTodoData, toggleTodoItemFinished } = useDataModel();
	const [todoList, setTodoList] = useState(initTodoList);
	const myInput = useRef();

	useEffect(() => {
		todo.forEach((item) => {
			if (item.contentId.toString() === params.contentId) {
				setTodoList(item);
			}
		});
	});
	console.log(todoList);

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
			let newState = { ...prevState };
			if (e.target.value) {
				newState.contents.push({
					itemId: '0',
					content: e.target.value,
					finished: false,
				});
			}
			return newState;
		});
		if (auth) {
			const toString = (data, key) => {
				return data.map((item) => item[key]).join('&');
			};
			const { userid } = jwtDecode(localStorage.getItem('token'));
			const request = {
				userId: userid,
				id: params.contentId,
				content: toString(todoList.contents, 'content'),
				finished: toString(todoList.contents, 'finished'),
			};
			updateTodoContent(request);
			getTodo({ userId: userid }).then((response) =>
				setTodoData(response.data)
			);
		}
		e.target.value = '';
		myInput.current.className = 'notShow';
	};

	const changeFinish = (contentId, itemId) => {
		toggleTodoItemFinished(contentId, itemId);
		if (auth) {
			const toString = (data, key) => {
				return data.map((item) => item[key]).join('&');
			};
			const { userid } = jwtDecode(localStorage.getItem('token'));
			const request = {
				userId: userid,
				id: params.contentId,
				content: toString(todoList.contents, 'content'),
				finished: toString(todoList.contents, 'finished'),
			};
			updateTodoContent(request);
			getTodo({ userId: userid }).then((response) =>
				setTodoData(response.data)
			);
		}
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
						.container {
							display: flex;
							align-items: center;
							margin-bottom: 10px;
						}
						.item {
							padding: 3px;
							display: inline-block;
						}
						.item--finished {
							text-decoration: line-through;
							color: #ccc;
						}
						.checkme {
							width: 22px;
							height: 22px;
							border: 2px solid #d0d0d0;
							border-radius: 6px;
							fill: #2dca70;
							display: flex;
							justify-content: center;
							align-items: center;
							margin-right: 10px;
							overflow: hidden;
						}
					`}
				>
					{todoList.contents &&
						todoList.contents.map((item, i) => (
							<div className='container' key={i}>
								<div
									className='checkme'
									onClick={() => changeFinish(parseInt(params.contentId), i) }
								>
									{item.finished && ( <svg t='1587830410954' className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1902' width='200' height='200' > {' '} <path d='M384.064 640.213333 213.482667 469.568 128.192 554.88 298.773333 725.525333 384.064 810.858667 895.850667 298.922667 810.56 213.589333 384.064 640.213333Z' p-id='1903' ></path>{' '} </svg> )}
								</div>
								<li
									className={` item ${item.finished ? 'item--finished' : ''} `}
								>
									{item.content}
								</li>
							</div>
						))}
				</ul>
			</div>
		</div>
	);
};

export default TodoPage;
