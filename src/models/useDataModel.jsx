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
		title: '🌈🌈😁😁😁',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam veritatis sapiente',
		content:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam veritatis sapiente',
	},
];
const initTodo = [
	{
		contentId: 19,
		category: 'todo',
		updateTime: '2020-03-11 00:52',
		title: '下周目标',
		content: ['学习'],
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

	const setTodoData = (todo) => {
		let newData = [];
		todo.forEach((item) => {
			newData.push({
				contentId: item.id,
				category: item.category,
				updateTime: item.updateTime,
				title: item.title,
				content: item.content ? item.content.split('&') : [],
			});
		});
		setTodo(newData);
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
		data,
		setData,
		todo,
		setTodo,
		deleteByContentId,
		getNoteInfo,
		setNoteData,
		setTodoData,
	};
}

export default createModel(useData);
