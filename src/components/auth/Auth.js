import { Form, Input, Button, notification } from 'antd';
import Cookies from 'universal-cookie';

import { login } from '../../api/auth';

import './Auth.css';

export function Auth(props) {
	const cookies = new Cookies();

	const onFinish = async (values) => {
		const result = await login(values);
		if (result) {
			props.onComplete()
			cookies.set('Authorization', result.data.token);
			cookies.set('refreshToken', result.data.refreshToken);
			notification.success({
				message: 'Successfully login',
			});
		} else {
			notification.error({
				message: "Couldn't login",
			});
		}
	};

	return (
		<Form name="authorization" onFinish={onFinish}>
			<Form.Item
				label="Email"
				name="email"
				rules={[
					{ required: true, message: 'Please input your email!' },
					{
						type: 'email',
						message: 'The input is not valid E-mail!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Login
				</Button>
			</Form.Item>
		</Form>
	);
}
