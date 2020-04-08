import { createModel } from 'hox';
import { useState } from 'react';

const initList = [
	{
		active: 0,
		format: 'heading-one',
		content: '大标题',
	},
	{
		active: 0,
		format: 'heading-two',
		content: '小标题',
	},
	{
		active: 0,
		format: 'bold',
		content: '粗体',
	},
	{
		active: 0,
		format: 'italic',
		content: '斜体',
	},
	{
		active: 0,
		format: 'underline',
		content: '下划线',
	},
];

function useEditBar() {
	const [editList, setEditList] = useState(initList);

	const selectEdit = (format) => {
		setEditList((prevList) =>
			editList.map((item) => {
				if (format === item.format) {
					item.active = 1;
				} else {
					item.active = 0;
				}
				return item;
			})
		);
	};

	return { editList, selectEdit };
}

export default createModel(useEditBar);
