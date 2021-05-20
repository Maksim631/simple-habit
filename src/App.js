import { Layout } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import { ProvideAuth } from './hooks/use-auth';
import AuthorizataionPage from './pages/AuthorizationPage';

function App() {
	const { Header, Footer, Sider, Content } = Layout;

	return (
		<div className="App">
			<Router>
				<ProvideAuth>
					<Layout>
						<Header>
							<Link to="/login">Home</Link>
							<Link to="/">Habit</Link>
						</Header>
						<Switch>
							<Route path="/login">
								<AuthorizataionPage />
							</Route>
							<PrivateRoute path="/">
								<Layout>
									<Sider>Sider</Sider>
									<Content></Content>
								</Layout>
							</PrivateRoute>
						</Switch>

						<Footer>Footer</Footer>
					</Layout>
				</ProvideAuth>
			</Router>
		</div>
	);
}

export default App;
