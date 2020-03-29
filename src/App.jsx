import { useState, memo } from 'react';
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import { normalize } from 'polished';
import { useHistory, Route, Switch, Redirect } from 'react-router-dom';

import Container from './components/Container';
import MainBody from './components/MainBody';
import Header from './components/header/Header';
import MenuBtn from './components/header/MenuBtn';
import AppSwitch from './components/header/AppSwitch';
import CreateBtn from './components/header/CreateBtn';
import User from './components/header/User';
import Sidebar from './components/sidebar/Sidebar';
import NoPage from './components/noFound/NoPage';
import NoContent from './components/noFound/NoContent';

import RichTextDemo from './components/content/noteEditor/RichTextDemo';

import useThemeModel from './models/useThemeModel';

/*-------------- App ----------------*/
const App = props => {
	const { theme } = useThemeModel();
	const history = useHistory();

	// 侧栏
	const [showSidebar, setShowSidebar] = useState(true);

	// app category切换
	const [category, setCategory] = useState(0);
	const handleCategorySwitch = index => {
		history.push(`/${!index ? 'note' : 'todo'}`);
		setCategory(index);
	};

	// 创建文章
	const handleTapCreate = () => {
		// 创建文章
	};

	// 用户视图
	const handleClickUser = () => {
		// 进入用户界面
	};

	return (
		<StyledApp theme={theme}>
			<Container>
				<Header>
					<MenuBtn
						initial={true}
						on={showSidebar}
						onTap={() => setShowSidebar(!showSidebar)}
					/>
					<AppSwitch activeIndex={category} onSwitch={handleCategorySwitch} />
					<CreateBtn onTap={handleTapCreate}>+ 写文章</CreateBtn>
					<User onClick={handleClickUser}>
						<img
							src='https://cdn2.ettoday.net/images/2194/d2194378.jpg'
							alt='wtf'
						/>
					</User>
				</Header>

				<Route exact path='/' render={() => <Redirect to='/note' />} />
				<Switch>
					{/* ----------------note---------------- */}
					<Route path='/note'>
						<MainBody>
							<Switch>
								<Route path='/note/:contentId'>
									<Sidebar category='note' show={showSidebar} />
									<RichTextDemo></RichTextDemo>
								</Route>

								<Route path='/note'>
									<Sidebar category='note' show={showSidebar} />
									<NoContent />
								</Route>
							</Switch>
						</MainBody>
					</Route>

					{/* ----------------todo---------------- */}
					<Route path='/todo'></Route>

					<Route>
						<NoPage redirectTo={!category ? 'note' : 'todo'} />
					</Route>
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

export default memo(App);
