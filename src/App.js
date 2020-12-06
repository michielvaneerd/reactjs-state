// https://kentcdodds.com/blog/application-state-management-with-react
// https://www.digitalocean.com/community/tutorials/how-to-share-state-across-react-components-with-context#step-1-%E2%80%94-building-the-basis-for-your-application

import TodoList from './TodoList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserList from './UserList';
import { AuthContext, useAuth } from './hooks/useAuth';
import PrivateRoute from './PrivateRoute';
import Login from './Login';

export default function App() {
    const auth = useAuth();
    return (
        <AuthContext.Provider value={auth}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <PrivateRoute exact path="/users">
                        <UserList />
                    </PrivateRoute>
                    {/* The below route will NOT be unmounted when going to a nested route inside the TodoList component
                    See for explanation: https://github.com/ReactTraining/react-router/issues/6804 */}
                    <PrivateRoute path="/users/:userid">
                        <TodoList />
                    </PrivateRoute>
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}