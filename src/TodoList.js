import { useState } from 'react';
import TodoListItem from './TodoListItem';
import BreadCrumbList from './BreadCrumbList';
import { Route, NavLink, Switch, useParams, useRouteMatch } from 'react-router-dom';
import useFetch from './hooks/useFetch';
import Todo from './Todo';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MyCache from './MyCache';

function reducer(state, action) {
    switch (action.type) {
        case "FETCH":
            MyCache[action.key] = action.payload;
            return { ...state, todos: action.payload };
        case "ERROR":
            return { ...state, error: action.payload };
        case "TOGGLE_COMPLETED":
            {
                const index = state.todos.findIndex((todo) => todo.id === action.payload);
                const todo = state.todos[index];
                todo.completed = !todo.completed;
                return { ...state, todos: Object.assign([], state.todos, { index: todo }) };
            }
        case "DELETE":
            {
                const index = state.todos.findIndex((todo) => todo.id == action.payload);
                const newState = { ...state, todos: [...state.todos.slice(0, index), ...state.todos.slice(index + 1)] };
                MyCache[action.key] = newState.todos;
                return newState;
            }
        case "SAVE":
            {
                if (action.payload.id) {
                    const index = state.todos.findIndex((item) => item.id == action.payload.id);
                    const oldTodo = state.todos[index];
                    oldTodo.title = action.payload.title;
                    return { ...state, todos: Object.assign([], state.todos, { index: oldTodo })};
                } else {
                    return {...state, todos: [...state.todos, { id: Date.now(), title: action.payload.title, completed: false }]};
                }
            }
        default:
            throw Error("Unknown action");
    }
}

export default function TodoList(props) {

    const [filter, setFilter] = useState("ALL");
    const params = useParams();
    const cacheKey = "todos_" + params.userid;

    const [state, dispatch] = useFetch("https://jsonplaceholder.typicode.com/todos?userId=" + params.userid, reducer, {
        todos: null,
        error: null
    }, () => MyCache.getByKey(cacheKey), cacheKey);

    const match = useRouteMatch();

    const { error, todos } = state;

    if (error) {
        return <div className="alert alert-danger mt-5">Error: {error.toString()}</div>
    }

    if (!todos) {
        return <div className="alert alert-info mt-5">Loading data...</div>
    }

    function toggleCompleted(id) {
        dispatch({
            type: "TOGGLE_COMPLETED",
            payload: id
        });
    }

    function deleteTodo(id) {
        dispatch({
            type: "DELETE",
            payload: id,
            key: cacheKey
        });
    }

    function saveTodo(todo) {
        dispatch({
            type: "SAVE",
            payload: todo,
            key: cacheKey
        });
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