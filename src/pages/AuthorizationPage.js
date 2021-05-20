import { Card, Row, Col } from 'antd';

import { Registration } from '../components/registration/Registration';
import { Auth } from '../components/auth/Auth';

import './AuthorizationPage.css'

const AuthorizataionPage = () => {

	return (
		<Row justify="center" className="authorization-content" gutter={[0, 50]}>
			<Col xl={6} xs={{span: 20,}}>
				<Card title="Login">
					<Auth />
				</Card>
			</Col>
			<Col xl={{span: 6, offset: 2}} xs={{span: 20, }}>
				<Card title="Registration">
					<Registration />
				</Card>
			</Col>
		</Row>
	);
};
export default AuthorizataionPage;
