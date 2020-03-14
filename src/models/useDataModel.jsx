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
				{
					id: uuid(),
					behave: 'link',
					content: '百度',
					linkUrl: 'https://www.baidu.com'
				}
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
					content: 'dasdafafadasdad'
				},
				{
					id: uuid(),
					behave: 'link',
					content: '百度',
					linkUrl: 'https://www.baidu.com'
				}
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
			title: '把👴整笑了',
			body: [
				{
					id: uuid(),
					behave: 'h1',
					content: 'dasdafafadasdad'
				},
				{
					id: uuid(),
					behave: 'link',
					content: '百度',
					linkUrl: 'https://www.baidu.com'
				}
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
			title: '把👴整笑了',
			body: [
				{
					id: uuid(),
					behave: 'h1',
					content: 'dasdafafadasdad'
				},
				{
					id: uuid(),
					behave: 'link',
					content: '百度',
					linkUrl: 'https://www.baidu.com'
				}
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
			title: '把👴整笑了',
			body: [
				{
					id: uuid(),
					behave: 'h1',
					content: 'dasdafafadasdad'
				},
				{
					id: uuid(),
					behave: 'link',
					content: '百度',
					linkUrl: 'https://www.baidu.com'
				}
			]
		}
	}
];

function useData() {
	const [data, setData] = useState(initData);
	const deleteByIndex = index => data.filter((item, i) => index === i);

	return {
		data,
		setData,
		deleteByIndex
	};
}

export default createModel(useData);
