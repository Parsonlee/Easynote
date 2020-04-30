import { createModel } from 'hox';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import useAuthModel from './useAuthModel';
import { getNote, deleteNote, getTodo, deleteTodo } from '../utils/requests';

const initNote = [
	{
		contentId: 0,
		category: 'note',
		updateTime: '2020-03-11 00:52:37',
		title: '🌈🌈请点这里查看使用教程',
		description: '🥳初次使用请先点击右上角头像，进入用户注册并登陆。',
		content: '',
	},
];
const initTodo = [
	{
		contentId: 19,
		category: 'todo',
		updateTime: '2020-03-11 00:52:50',
		title: '下周目标',
		contents: [
			{
				itemId: '0',
				content: '买菜',
				finished: false,
			},
			{
				itemId: '0',
				content: '学习',
				finished: false,
			},
		],
	},
];

function useData() {
	const [data, setData] = useState(initNote);
	const [todo, setTodo] = useState(initTodo);
	const { auth } = useAuthModel();

	const getNoteInfo = (index, type) => {
		let originText = JSON.parse(localStorage.getItem(index))[type];
		let text = '';
		originText.children.forEach((item) => {
			text += item.text;
		});
		// console.log(text);
		return text;
	};

	const setNoteData = (note) => {
		let newData = [];
		note.forEach((item) => {
			localStorage.setItem(item.id, item.content);
			newData.push({
				contentId: item.id,
				category: item.category,
				updateTime: item.updateTime,
				title: JSON.parse(localStorage.getItem(item.id))[0]
					? getNoteInfo(item.id, 0)
					: '',
				description: JSON.parse(localStorage.getItem(item.id))[1]
					? getNoteInfo(item.id, 1)
					: '',
				content: item.content,
			});
		});
		setData(newData);
	};

	const getTodoContents = (content, finished) => {
		let newContents = [];
		content = content ? content.split('&') : [];
		finished = finished ? finished.split('&') : [];

		if (content !== []) {
			content.forEach((item, index) => {
				newContents.push({
					itemId: `${index}`,
					content: item,
					finished: finished[index] === 'true' ? true : false,
				});
			});
		}
		return newContents;
	};

	const setTodoData = (todo) => {
		let newData = [];
		todo.forEach((item) => {
			newData.push({
				contentId: item.id,
				category: item.category,
				updateTime: item.updateTime,
				title: item.title,
				contents: getTodoContents(item.content, item.finished),
			});
		});
		setTodo(newData);
	};

	const toggleTodoItemFinished = (contentId, itemId) => {
		const newTodo = todo.map((todo) => {
			if (todo.contentId === contentId) {
				todo.contents[itemId].finished = !todo.contents[itemId].finished;
			}
			return todo;
		});

		setTodo(newTodo);
	};

	useEffect(() => {
		if (auth) {
			const { userid } = jwtDecode(localStorage.getItem('token'));
			const userId = { userId: userid };
			getNote(userId).then((response) => setNoteData(response.data));
			getTodo(userId).then((response) => setTodoData(response.data));
		}
		// eslint-disable-next-line
	}, [auth]);

	const deleteByContentId = (contentId, category) => {
		if (auth) {
			const { userid } = jwtDecode(localStorage.getItem('token'));
			const request = { userId: userid, id: contentId };
			// console.log(request);
			if (category === 'note') {
				deleteNote(request);
				setData(data.filter((item) => item.contentId !== contentId));
				localStorage.removeItem(contentId);
			} else {
				deleteTodo(request);
				setTodo(todo.filter((item) => item.contentId !== contentId));
			}
		}
	};

	return {
		initNote,
		initTodo,
		data,
		setData,
		todo,
		setTodo,
		deleteByContentId,
		getNoteInfo,
		setNoteData,
		setTodoData,
		toggleTodoItemFinished,
		getTodoContents,
	};
}

export default createModel(useData);
