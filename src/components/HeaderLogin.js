import { Button, Col, Row } from 'antd';
import { useHistory } from "react-router-dom";
import { useAuth } from '../hooks/use-auth';


function HeaderLogin() {
    const auth = useAuth();
	const history = useHistory();

    const logout = async () => {
        const result = await auth.logout();
		if (result.statusCode === 200) {
			history.push('/login')
		}
	}

	return (
		<Row justify="space-between" >
			<Col style={{color: "white"}}>Simple Habit</Col>
			<Col>{auth.user ? <Button size="small" onClick={logout}>Logout </Button> : ""}</Col>
		</Row>
	);
}

export default HeaderLogin;
