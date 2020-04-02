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
import Sidebar from './components/sidebar/Sidebar';
import NoPage from './components/noFound/NoPage';
import NoContent from './components/noFound/NoContent';
import User from './components/header/User';
import Register from './components/user/Register';

import RichTextDemo from './components/content/noteEditor/RichTextDemo';

import useThemeModel from './models/useThemeModel';
import Login from './components/user/Login';

/*-------------- App ----------------*/
const App = () => {
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
		history.push('/register');
	};

	return (
		<StyledApp theme={theme}>
			<Container>
				<Route exact path='/' render={() => <Redirect to='/note' />} />

				{/*-------------- Header ----------------*/}
				<Switch>
					<Route exact path='/register' />
					<Route exact path='/login' />

					<Route>
						<Header>
							<MenuBtn
								initial={true}
								on={showSidebar}
								onTap={() => setShowSidebar(!showSidebar)}
							/>
							<AppSwitch
								activeIndex={category}
								onSwitch={handleCategorySwitch}
							/>
							<CreateBtn onTap={handleTapCreate}>+ 写文章</CreateBtn>
							<User onClick={handleClickUser}>
								<img
									src='https://business.bing.com/api/v3/search/person/photo?id=e502bfaa-c47b-4a19-9b60-77d01b1a3bae'
									alt='wtf'
								/>
							</User>
						</Header>
					</Route>
				</Switch>


				{/*-------------- Container ----------------*/}
				<Switch>

					{/*-------------- Login ----------------*/}
					<Route path='/login' component={Login} />

					{/*-------------- Register ----------------*/}
					<Route path='/register' component={Register} />
					
					{/* ----------------note---------------- */}
					<Route path='/note'>
						<MainBody>
							<Switch>
								<Route exact path='/note'>
									<Sidebar category='note' show={showSidebar} />
									<NoContent />
								</Route>
								<Route path='/note/nocontent'>
									<Sidebar category='note' show={showSidebar} />
									<NoContent />
								</Route>
								<Route path='/note/:contentId'>
									<Sidebar category='note' show={showSidebar} />
									<RichTextDemo></RichTextDemo>
								</Route>
							</Switch>
						</MainBody>
					</Route>

					{/* ----------------todo---------------- */}
					<Route path='/todo'>
						<MainBody>
							<Switch>
								<Route exact path='/todo'>
									<Sidebar category='todo' show={showSidebar} />
									<NoContent />
								</Route>
								<Route path='/todo/nocontent'>
									<Sidebar category='todo' show={showSidebar} />
									<NoContent />
								</Route>
								<Route path='/todo/:contentId'>
									<Sidebar category='todo' show={showSidebar} />
								</Route>
							</Switch>
						</MainBody>
					</Route>

					{/*-------------- NoPage ----------------*/}		
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
