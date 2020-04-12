import { createModel } from 'hox';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import useAuthModel from './useAuthModel';
import { getNoteData } from '../utils/requests';

const initData = [
	{
		contentId: '0',
		category: 'note',
		updateTime: '2020-03-11 00:52',
		title: '🌈🌈😁😁😁',
		description: 'beatae illum cumque repudiandae corporis iure molestiae tempore.',
		content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam veritatis sapiente'
	}
];

function useData() {
	const [data, setData] = useState(initData);
	const { auth } = useAuthModel();

	useEffect(() => {
		if (auth) {
			const { id } = jwtDecode(localStorage.getItem('jwtToken'));
			const userId = { userId: id };
			getNoteData(userId).then((response) => {
				for(let i=0;i<response.data.length;i++){
					var arr = [];
					arr.push(response.data[i]);
					localStorage.setItem(i,response.data[i].content);
				}
				console.log(arr);
				setData(arr)
			});
		}
	},[auth]);

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
