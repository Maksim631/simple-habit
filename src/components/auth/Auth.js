import { Button, Form, Input, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import './Auth.css';



export function Auth(props) {
	const auth = useAuth();
	const history = useHistory();

	const onFinish = async (values) => {
		const result = await auth.login(values);
		if (result) {
			notification.success({
				message: `Welcome back, ${result.name}`,
			});
			history.push('/');
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
