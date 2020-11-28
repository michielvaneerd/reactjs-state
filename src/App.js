// https://kentcdodds.com/blog/application-state-management-with-react
// https://www.digitalocean.com/community/tutorials/how-to-share-state-across-react-components-with-context#step-1-%E2%80%94-building-the-basis-for-your-application

import TodoList from './TodoList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserList from './UserList';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <UserList />
                </Route>
                <Route path="/users/:userid">
                    <TodoList />
                </Route>
            </Switch>
        </Router>
    );
}