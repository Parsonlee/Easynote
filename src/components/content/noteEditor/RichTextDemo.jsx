import { useCallback, useMemo, useState } from 'react';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { Editor, Transforms, createEditor } from 'slate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBold,
	faItalic,
	faUnderline,
	faHeading
} from '@fortawesome/free-solid-svg-icons';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

const RichTextDemo = () => {
	const params = useParams();

	const [value, setValue] = useState(
		JSON.parse(localStorage.getItem('contentTest')) || initialValue
	);
	const renderElement = useCallback(props => <Element {...props} />, []);
	const renderLeaf = useCallback(props => <Leaf {...props} />, []);
	const editor = useMemo(() => withReact(createEditor()), []);

	return (
		<EditField>
			<h2>I'm {params.contentId}</h2>
			<Slate
				editor={editor}
				value={value}
				onChange={value => {
					setValue(value);
					const content = JSON.stringify(value);
					console.log(content);
					localStorage.setItem('contentTest', content);
				}}
			>
				<Toolbar>
					<MarkButton format='bold'>
						<FontAwesomeIcon icon={faBold} />
					</MarkButton>
					<MarkButton format='italic'>
						<FontAwesomeIcon icon={faItalic} />
					</MarkButton>
					<MarkButton format='underline'>
						<FontAwesomeIcon icon={faUnderline} />
					</MarkButton>
					<BlockButton format='heading-one'>
						<FontAwesomeIcon icon={faHeading} />
					</BlockButton>
					<BlockButton format='heading-two'>
						<FontAwesomeIcon icon={faHeading} />
					</BlockButton>
				</Toolbar>
				<Editable
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					placeholder='Enter some rich text…'
					autoFocus
				/>
			</Slate>
		</EditField>
	);
};

const toggleBlock = (editor, format) => {
	const isActive = isBlockActive(editor, format);

	Transforms.setNodes(editor, {
		type: isActive ? 'paragraph' : format
	});
};

const toggleMark = (editor, format) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

const isBlockActive = (editor, format) => {
	const [match] = Editor.nodes(editor, {
		match: n => n.type === format
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

const BlockButton = ({ format, children }) => {
	const editor = useSlate();
	return (
		<span
			css={css`
				cursor: pointer;
				margin-left: 15px;
				color: ${format ? 'black' : '#aaa'};
			`}
			active={isBlockActive(editor, format)}
			onMouseDown={e => {
				e.preventDefault();
				toggleBlock(editor, format);
			}}
		>
			{children}
		</span>
	);
};

const MarkButton = ({ format, children }) => {
	const editor = useSlate();
	return (
		<span
			css={css`
				cursor: pointer;
				margin-left: 15px;
				color: ${format ? 'black' : '#aaa'};
			`}
			active={isMarkActive(editor, format)}
			onMouseDown={e => {
				e.preventDefault();
				toggleMark(editor, format);
			}}
		>
			{children}
		</span>
	);
};

const Toolbar = styled.div`
	width: 100%;
	height: 55px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2px 4px;
	border-bottom: 2px solid #eee;
`;

const EditField = styled.div`
	position: relative;
	background: #ffffff;
	padding: 20px 40px;
	width: 75%;
	height: 100%;
	margin: 0 auto;
	outline: none;
`;

const initialValue = [
	{
		type: 'paragraph',
		children: [
			{ text: 'This is editable ' },
			{ text: 'rich', bold: true },
			{ text: ' text, ' },
			{ text: 'much', italic: true },
			{ text: ' better than a ' },
			{ text: '<textarea>', code: true },
			{ text: '!' }
		]
	},
	{
		type: 'paragraph',
		children: [
			{
				text:
					"Since it's rich text, you can do things like turn a selection of text "
			},
			{ text: 'bold', bold: true },
			{
				text:
					', or add a semantically rendered block quote in the middle of the page, like this:'
			}
		]
	},
	{
		type: 'paragraph',
		children: [{ text: 'Try it out for yourself!' }]
	}
];

export default RichTextDemo;
