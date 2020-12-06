import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from './hooks/useAuth';

export default function PrivateRoute({ children, ...rest }) {
    
    const auth = useContext(AuthContext);

    return (
        <Route {...rest} render={() => auth.isAuth ? children : <Redirect to="/" />} />
    );
}