import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const PrivateRoute = ({ children, ...rest }) => {
	const auth = useAuth();

	return <Route {...rest} render={() => (auth.user ? children : <Redirect to={{ pathname: '/login' }} />)}></Route>;
};

export default PrivateRoute;
