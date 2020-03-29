import { createModel } from 'hox';
import { useState } from 'react';
import { uuid } from 'uuidv4';

const initData = [
	{
		id: '0',
		category: 'note',
		contentId: '0',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 00:52:49',
		content: {
			title: '🌈🌈Easynote是真的🐂🍺',
			body: [
				{
					id: uuid(),
					behave: 'h1',
					content: 'dasdafafadasdad'
				},
			]
		}
	},
	{
		id: '1',
		category: 'note',
		contentId: '1',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 00:52:49',
		content: {
			title: '把👴整笑了',
			body: [
				{
					id: uuid(),
					behave: 'h1',
					content: 'shabi'
				},
			]
		}
	},
	{
		id: '2',
		category: 'note',
		contentId: '2',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 00:52:49',
		content: {
			title: '把👵整笑了',
			body: [
				{
					id: uuid(),
					behave: 'h1',
					content: 'hajsildjlad'
				},
			]
		}
	},
	{
		id: '3',
		category: 'note',
		contentId: '3',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 00:52:49',
		content: {
			title: '把👳整笑了',
			body: [
				{
					id: uuid(),
					behave: 'h1',
					content: 'iqwueiouqowie'
				},
			]
		}
	},
	{
		id: '4',
		category: 'note',
		contentId: '4',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 00:52:49',
		content: {
			title: '把👲整笑了',
			body: [
				{
					id: uuid(),
					behave: 'h1',
					content: 'jahsjhdjkasd'
				},
			]
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
