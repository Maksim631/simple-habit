import { Modal, Button } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';

import { Registration } from './components/registration/Registration';
import { Auth } from './components/auth/Auth';

function App() {
	const [visibleReg, setVisibleReg] = useState(false);
	const [visibleLogin, setVisibleLogin] = useState(false);

	const showRegistration = () => {
		setVisibleReg(true);
	};
	const showAuth = () => {
		setVisibleLogin(true);
	};

	const handleOk = () => {
		setVisibleReg(false);
		setVisibleLogin(false);
	};

	const handleCancel = () => {
		console.log('Clicked cancel button');
		setVisibleReg(false);
		setVisibleLogin(false);
	};

	return (
		<div className="App">
			<Button onClick={showRegistration}>Registration</Button>
			<Button onClick={showAuth}>Login</Button>
			<Modal title="Registration" visible={visibleReg} footer={null} onCancel={handleCancel}>
				<Registration onComplete={handleOk} />
			</Modal>
			<Modal title="Login" visible={visibleLogin} footer={null} onCancel={handleCancel}>
				<Auth onComplete={handleOk} />
			</Modal>
		</div>
	);
}

export default App;
