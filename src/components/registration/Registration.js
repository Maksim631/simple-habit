import { Form, Input, Button, notification } from 'antd';

import { register } from '../../api/auth.js';

import './Registration.css';

export function Registration(props) {
	const onFinish = async (values) => {
		const result = await register(values);
		if (result) {
			props.onComplete();
			notification.success({
				message: 'Registration completed',
			});
		} else {
			notification.error({
				message: 'Something went wrong',
			});
		}
	};

	return (
		<Form name="registration" onFinish={onFinish}>
			<Form.Item
				label="Username"
				name="name"
				rules={[{ required: true, message: 'Please input your username!' }]}
			>
				<Input />
			</Form.Item>

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

			<Form.Item
				label="Confirm password"
				name="confirmedPassword"
				dependencies={['password']}
				rules={[
					{ required: true, message: 'Please input your password!' },
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error('The two passwords that you entered do not match!'));
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}
