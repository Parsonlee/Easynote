import { useState, useCallback, useMemo } from 'react';
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import { normalize } from 'polished';
import { useHistory, Route, Switch } from 'react-router-dom';

import Container from './components/Container';
import MainBody from './components/MainBody';
import Header from './components/header/Header';
import MenuBtn from './components/header/MenuBtn';
import AppSwitch from './components/header/AppSwitch';
import CreateBtn from './components/header/CreateBtn';
import Sidebar from './components/sidebar/Sidebar';
import SidebarItem from './components/sidebar/SidebarItem';
import NoPage from './components/NoPage';

import useThemeModel from './models/useThemeModel';
import useDataModel from './models/useDataModel';

/*-------------- App ----------------*/
const App = props => {
	const { theme } = useThemeModel();
	const history = useHistory();

	// 文章data
	const { data, deleteByIndex } = useDataModel();

	// 侧栏
	const [showSidebar, setShowSidebar] = useState(true);
	const [activeIndex, setActiveIndex] = useState(0);
	const handleMenuBtnSwitch = useCallback(onOff => {
		setShowSidebar(onOff);
	}, []);

	// 主功能切换
	const [category, setCategory] = useState(0);
	const handleCategorySwitch = useCallback(
		active => {
			setCategory(active);
		},
		[setCategory]
	);
	const categoryParam = useMemo(() => (category === 0 ? 'note' : 'todo'), [
		category
	]);

	// 侧栏导航
	const handleClickItem = (contentId, index) => {
		// history.push(`/${categoryParam}/${contentId}`); // 切换导航
		setActiveIndex(index); // 激活index对应侧栏item
	};

	// 创建文章
	const handleTapCreate = () => {
		// do something to create a note
	};

	return (
		<StyledApp theme={theme}>
			<Container>
				<Header>
					<MenuBtn initial={true} onSwitch={handleMenuBtnSwitch} />
					<AppSwitch initial={0} onSwitch={handleCategorySwitch} />
					<CreateBtn onTap={handleTapCreate}>+ 写文章</CreateBtn>
				</Header>

				<Switch>
					<Route exact path='/'>
						<MainBody>
							<Sidebar show={showSidebar}>
								{data.map((item, i) => {
									return (
										item.category === 'note' && (
											<SidebarItem
												key={item.id}
												title={item.content.title}
												desription={item.content.body[0]['content']}
												date={item.createdTime}
												timeBefore='3小时前'
												active={i === activeIndex}
												index={i}
												onTap={index => handleClickItem(item.contentId, index)}
												onClickDelBtn={() => deleteByIndex(i)}
											/>
										)
									);
								})}
							</Sidebar>
						</MainBody>
					</Route>
					<Route component={NoPage} />
				</Switch>
			</Container>
		</StyledApp>
	);
};

/*-------------- style for App ----------------*/

const StyledApp = ({ theme, children }) => {
	return (
		<div
			css={css`
				height: 100vh;
				display: grid;
				place-items: center;
				background: ${theme.mode === 'dark'
					? '#111B1F'
					: theme.background.base};
			`}
		>
			<Global
				styles={css`
					* {
						box-sizing: border-box;
					}
					${normalize()};
				`}
			/>
			{children}
		</div>
	);
};

export default App;
