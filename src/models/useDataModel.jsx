import { createModel } from 'hox';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import useAuthModel from './useAuthModel';
import { getNote, deleteNote } from '../utils/requests';

const initData = [
	{
		contentId: 0,
		category: 'note',
		updateTime: '2020-03-11 00:52',
		title: '🌈🌈😁😁😁',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam veritatis sapiente',
		content:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam veritatis sapiente',
	},
];

function useData() {
	const [data, setData] = useState(initData);
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

	const setNote = (data) => {
		let newData = [];
		data.forEach((item) => {
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

	useEffect(() => {
		if (auth) {
			const { userid } = jwtDecode(localStorage.getItem('token'));
			const userId = { userId: userid };
			getNote(userId).then((response) => setNote(response.data));
		}
		// eslint-disable-next-line
	}, [auth]);

	const deleteByContentId = (contentId) => {
		if (auth) {
			const { userid } = jwtDecode(localStorage.getItem('token'));
			const request = { userId: userid, id: contentId };
			// console.log(request);
			deleteNote(request);
			setData(data.filter((item) => item.contentId !== contentId));
			localStorage.removeItem(contentId);
		}
	};

	return {
		data,
		setData,
		deleteByContentId,
		getNoteInfo,
		setNote,
	};
}

export default createModel(useData);
