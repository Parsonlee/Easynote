import { createModel } from 'hox';
import { useState } from 'react';

const initData = [
	{
		contentId: '0',
		category: 'note',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 00:52:49',
		title: localStorage[0]
			? JSON.parse(localStorage.getItem(0))[0].children[0].text
			: '🌈🌈😁😁😁',
		content: {
			description: localStorage[0]
				? JSON.parse(localStorage.getItem(0))[1].children[0].text
				: 'beatae illum cumque repudiandae corporis iure molestiae tempore.',
		},
	},
	{
		contentId: '1',
		category: 'note',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 00:20:50',
		title: localStorage[1]
			? JSON.parse(localStorage.getItem(1))[0].children[0].text
			: '把👴整笑了',
		content: {
			description: localStorage[1]
				? JSON.parse(localStorage.getItem(1))[1].children[0].text
				: 'provident quasi. Facere dolorem quae iure hic accusamus quia nesciunt delectus quidem omnis',
		},
	},
	{
		contentId: '2',
		category: 'note',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 22:22:22',
		title: localStorage[2]
			? JSON.parse(localStorage.getItem(2))[0].children[0].text
			: '把👵整笑了',
		content: {
			description: localStorage[2]
				? JSON.parse(localStorage.getItem(2))[1].children[0].text
				: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
		},
	},
	{
		contentId: '3',
		category: 'note',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 10:30:49',
		title: localStorage[3]
			? JSON.parse(localStorage.getItem(3))[0].children[0].text
			: '把👳整笑了',
		content: {
			description: localStorage[3]
				? JSON.parse(localStorage.getItem(3))[1].children[0].text
				: 'Minus maxime earum, asperiores enim quas quaerat voluptas ex explicabo suscipit? ',
		},
	},
	{
		contentId: '4',
		category: 'note',
		createdTime: '2020-03-10',
		updatedTime: '2020-03-11 20:38:00',
		title: localStorage[4]
			? JSON.parse(localStorage.getItem(4))[0].children[0].text
			: '把👲整笑了',
		content: {
			description: localStorage[4]
				? JSON.parse(localStorage.getItem(4))[1].children[0].text
				: 'Ipsum pariatur molestias, beatae illum cumque repudiandae corporis iure molestiae tempore.',
		},
	},
];

function useData() {
	const [data, setData] = useState(initData);

	const deleteByContentId = (contentId) => {
		setData(data.filter((item) => item.contentId !== contentId));
	};

	return {
		data,
		setData,
		deleteByContentId,
	};
}

export default createModel(useData);
