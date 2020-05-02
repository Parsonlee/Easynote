import { useCallback, useMemo, useState, useEffect } from 'react';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { Editor, Transforms, createEditor } from 'slate';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import ToolBar from '../toolbar/ToolBar';
import EditBar from '../toolbar/EditBar';
import { updateNote, getNote } from '../../../utils/requests';
import useAuthModel from '../../../models/useAuthModel';
import useDataModel from '../../../models/useDataModel';

const RichTextDemo = () => {
	const params = useParams();
	const { auth } = useAuthModel();
	const { setNoteData } = useDataModel();
	const [showEditBar, setShowEditBar] = useState(false);
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(
			JSON.parse(localStorage.getItem(`${params.contentId}`)) || initialValue
		);
	}, [params.contentId]);

	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(() => withReact(createEditor()), []);

	const toggleEditBar = () => {
		setShowEditBar(!showEditBar);
	};
	const notLostFocus = (e) => {
		e && e.preventDefault();
	};
	const modifyNote = () => {
		if (auth) {
			const { userid } = jwtDecode(localStorage.getItem('token'));
			const request = {
				userId: userid,
				id: params.contentId,
				content: JSON.stringify(value),
			};
			// console.log(request);
			updateNote(request);
			getNote({ userId: userid }).then((response) =>
				setNoteData(response.data)
			);
		}
	};

	return (
		<EditField>
			<Slate
				editor={editor}
				value={value}
				onChange={(value) => {
					setValue(value);
					if (auth) {
						const content = JSON.stringify(value);
						localStorage.setItem(`${params.contentId}`, content);
					}
				}}
			>
				<Editable
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					onBlur={modifyNote}
					spellCheck={false}
					// autoFocus
				/>
				<ToolBar
					css={css`
						position: absolute;
						right: 20px;
						bottom: 40px;
					`}
					category='note'
					toggleEditBar={toggleEditBar}
					onMouseDown={notLostFocus}
				/>
				<EditBar showEditBar={showEditBar}>
					<BlockButton content='大标题' format='heading-one' />
					<BlockButton content='小标题' format='heading-two' />
					<MarkButton content='粗体' format='bold' />
					<MarkButton content='斜体' format='italic' />
					<MarkButton content='下划线' format='underline' />
				</EditBar>
			</Slate>
		</EditField>
	);
};

const toggleBlock = (editor, format) => {
	const isActive = isBlockActive(editor, format);
	Transforms.setNodes(editor, {
		type: isActive ? 'paragraph' : format,
	});
};

const toggleMark = (editor, format) => {
	const isActive = isMarkActive(editor, format) ? 1 : undefined;
	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

const isBlockActive = (editor, format) => {
	const [match] = Editor.nodes(editor, {
		match: (n) => n.type === format,
	});
	return !!match;
};

const isMarkActive = (editor, format) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
	switch (element.type) {
		case 'heading-one':
			return <h1 {...attributes}>{children}</h1>;
		case 'heading-two':
			return <h2 {...attributes}>{children}</h2>;
		default:
			return <p {...attributes}>{children}</p>;
	}
};

const Leaf = ({ attributes, children, leaf }) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}
	if (leaf.italic) {
		children = <em>{children}</em>;
	}
	if (leaf.underline) {
		children = <u>{children}</u>;
	}
	return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, content }) => {
	const editor = useSlate();
	return (
		<div
			css={css`
				position: relative;
				cursor: pointer;
				opacity: ${isBlockActive(editor, format) ? 1 : 0.5};
				margin: 3px 0;
			`}
			className={format}
			active={isBlockActive(editor, format) ? 1 : undefined}
			onMouseDown={(e) => {
				e.preventDefault();
				toggleBlock(editor, format);
			}}
		>
			{/* 小圆点 */}
			<div
				css={css`
					position: absolute;
					top: 50%;
					left: -10px;
					transform: translateY(-50%);
					padding: 3px;
					background: #2dca70;
					border-radius: 50%;
					display: ${isBlockActive(editor, format) ? 'block' : 'none'};
				`}
			></div>
			{/* 小圆点 */}
			{content}
		</div>
	);
};
const MarkButton = ({ format, content }) => {
	const editor = useSlate();
	return (
		<div
			css={css`
				position: relative;
				cursor: pointer;
				opacity: ${isMarkActive(editor, format) ? 1 : 0.5};
				margin: 3px 0;
			`}
			className={format}
			active={isMarkActive(editor, format) ? 1 : undefined}
			onMouseDown={(e) => {
				e.preventDefault();
				toggleMark(editor, format);
			}}
		>
			{/* 小圆点 */}
			<div
				css={css`
					position: absolute;
					top: 50%;
					left: -10px;
					transform: translateY(-50%);
					padding: 3px;
					background: #2dca70;
					border-radius: 50%;
					display: ${isMarkActive(editor, format) ? 'block' : 'none'};
				`}
			></div>
			{/* 小圆点 */}
			{content}
		</div>
	);
};

const EditField = styled.div`
	position: relative;
	background: #ffffff;
	width: 100%;
	height: 100%;
	padding: 0 65px;
	outline: none;
	@media only screen and (min-width: 320px) and (max-width: 768px) {
		padding: 0 35px;
	}
`;
const initialValue = [
	{
		type: 'heading-two',
		children: [{ text: '🌈🌈请点这里查看使用教程' }],
	},
	{
		type: 'paragraph',
		children: [
			{
				text:
					'	🥳初次使用请先点击右上角头像，进入用户注册并登陆。登陆成功后会看到右上角你的头像变为了一只可爱的小鹿。再次点击头像即可查看用户信息，在这里你可以上传自己的头像。',
			},
		],
	},
	{
		type: 'paragraph',
		children: [
			{
				text:
					'	😎接下来你就可以开始你的创作，点击右上角的按钮即可新建一篇笔记或是待办，将鼠标移到右边侧栏的条目上可以看到删除按钮，点击即可删除对应条目。同时你也可以选择打开或隐藏侧栏。',
			},
		],
	},
	{
		type: 'paragraph',
		children: [
			{
				text:
					'	✈️点开每个条目，右边主区域会显示编辑界面，右下角有两个按钮，在笔记中，点击第一个按钮会出现文字样式框，此时点击右上角的小鼠标后可对样式框进行拖拽；在待办中，点击第一个按钮会出现输入框，你可以输入新添加的事项。',
			},
		],
	},
	{
		type: 'paragraph',
		children: [
			{
				text:
					'	🚗感谢使用Easynote，有还需改进的地方请提出您的宝贵意见，谢谢🚢。',
			},
		],
	},
];

export default RichTextDemo;
