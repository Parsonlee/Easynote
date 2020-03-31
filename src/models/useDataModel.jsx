import { createModel } from 'hox';
import { useState } from 'react';

const initData = [
	{
		contentId: '0',
		category: 'note',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 00:52:49',
		title: JSON.parse(localStorage.getItem(0))[0].children[0].text,
		content: {
			description: JSON.parse(localStorage.getItem(0))[1].children[0].text,
		}
	},
	{
		contentId: '1',
		category: 'note',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 00:20:50',
		title: '把👴整笑了',
		content: {
			description: JSON.parse(localStorage.getItem(1))[0].children[0].text,
		}
	},
	{
		contentId: '2',
		category: 'note',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 22:22:22',
		title: '把👵整笑了',
		content: {
			description: JSON.parse(localStorage.getItem(2))[0].children[0].text,
		}
	},
	{
		contentId: '3',
		category: 'note',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 10:30:49',
		title: '把👳整笑了',
		content: {
			description: JSON.parse(localStorage.getItem(3))[0].children[0].text,
		}
	},
	{
		contentId: '4',
		category: 'note',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 20:38:00',
		title: '把👲整笑了',
		content: {
			description: JSON.parse(localStorage.getItem(4))[0].children[0].text,
		}
	}
];

function useData() {
	const [data, setData] = useState(initData);

	const deleteByContentId = contentId => {
		setData(data.filter(item => item.contentId !== contentId));
	};

	return {
		data,
		setData,
		deleteByContentId
	};
}

export default createModel(useData);
