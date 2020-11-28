import { useState } from 'react';
import TodoListItem from './TodoListItem';
import BreadCrumbList from './BreadCrumbList';
import { Route, NavLink, Switch, useParams, useRouteMatch } from 'react-router-dom';
import useFetch from './hooks/useFetch';
import Todo from './Todo';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function TodoList(props) {

    const [filter, setFilter] = useState("ALL");
    const params = useParams();
    const [todos, error, setTodos] = useFetch("https://jsonplaceholder.typicode.com/todos?userId=" + params.userid);
    const match = useRouteMatch();

    if (error) {
        return <div className="alert alert-danger mt-5">Error: {error.toString()}</div>
    }

    if (!todos) {
        return <div className="alert alert-info mt-5">Loading data...</div>
    }

    function toggleCompleted(id) {
        const index = todos.findIndex((todo) => todo.id === id);
        const todo = todos[index];
        todo.completed = !todo.completed;
        setTodos(Object.assign([], todos, { index: todo }));
    }

    function deleteTodo(id) {
        const index = todos.findIndex((todo) => todo.id === id);
        setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
    }

    function saveTodo(todo) {
        if (todo.id) {
            const index = todos.findIndex((item) => item.id == todo.id);
            const oldTodo = todos[index];
            oldTodo.title = todo.title;
            setTodos(Object.assign([], todos, { index: oldTodo }));
        } else {
            setTodos([...todos, { id: Date.now(), title: todo.title, completed: false }]);
        }
    }

    const breadCrumbs = [
        {
            title: "User " + params.userid,
            path: "/users" + params.userid
        }
    ];

    return (
        <Switch>
            <Route path={`${match.path}/create`}>
                <Todo saveTodo={saveTodo} />
            </Route>
            <Route path={`${match.path}/:todoid`}>
                <Todo saveTodo={saveTodo} />
            </Route>

            <Route path={match.path}>
                <>
                    <BreadCrumbList breadCrumbs={breadCrumbs} />
                    <nav className="navbar navbar-expand">
                        <span className="navbar-text mr-auto badge badge-info">
                            {"You have " + todos.length + " todos with " + (todos.filter((todo) => todo.completed).length) + " completed"}
                        </span>
                        <form className="form-inline">
                            <select className="form-control" value={filter} onChange={(e) => setFilter(e.target.value)}>
                                {["ALL", "COMPLETED", "NOT_COMPLETED"].map((s) => {
                                    return (
                                        <option key={s}>{s}</option>
                                    );
                                })}
                            </select>
                        </form>
                    </nav>

                    <TransitionGroup>
                        <CSSTransition in={true} appear={true} classNames="fader" timeout={600}>
                            <div className="row">
                                <div className="col">
                                    {todos.map((todo) => {
                                        return (filter === "ALL" || (filter === "COMPLETED" && todo.completed) || (filter === "NOT_COMPLETED" && !todo.completed)) ? <TodoListItem deleteTodo={deleteTodo} toggleCompleted={() => toggleCompleted(todo.id)} key={todo.id} todo={todo} /> : null;
                                    })}
                                </div>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>

                    <div className="row mt-2">
                        <div className="col">
                            <NavLink className="btn btn-primary float-right" to={"/users/" + params.userid + "/create"}>Add new todo</NavLink>
                        </div>
                    </div>
                </>
            </Route>
        </Switch>
    )
}