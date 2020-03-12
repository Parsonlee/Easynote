import { useState } from 'react';
import { createModel } from 'hox';

const initData = {
	onOff: false,
	title: '警告',
	description: '您的电脑可能中毒',
};

function useModal() {
	// 数据
	const [modal, setShowModal] = useState(initData);
	// 方法
	const openModal = ({ title = '警告', description = '这是modal弹框' }) => {
		setShowModal({ onOff: true, title, description });
	};

	const closeModal = () => {
		setShowModal({ onOff: false });
	};

	return { modal, openModal, closeModal };
}

export default createModel(useModal);
