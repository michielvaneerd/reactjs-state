import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import BreadCrumbList from './BreadCrumbList';
import MyCache from './MyCache';

export default function Todo(props) {

    const params = useParams();
    const history = useHistory();

    //const [todos] = useFetch("https://jsonplaceholder.typicode.com/todos?userId=" + params.userid);
    const todos = MyCache["todos_" + params.userid];
    
    const [todo, setTodo] = useState(todos && params.todoid ? (todos.find((item) => item.id == params.todoid)) : {});
    
    const titleInput = useRef();

    useEffect(function() {
        console.log("useEffect", todos);
        setTodo(todos && params.todoid ? (todos.find((item) => item.id == params.todoid)) : {});
    }, [todos, params.todoid]);

    useEffect(function() {
        titleInput.current.focus();
    }, []);

    function onChangeTitle(e) {
        let newTodo = { ...todo };
        newTodo.title = e.target.value;
        setTodo(newTodo);
    }

    const breadCrumbs = [
        {
            title: "User " + params.userid,
            path: "/users/" + params.userid
        },
        {
            title: "Todo",
            path: "/users/" + params.userid + (todo ? ("/" + todo.id) : "/create")
        }
    ];

    return (
        <>
            <BreadCrumbList breadCrumbs={breadCrumbs} />
            <div className="row">
            <div className="col">

                <form>
                    <div className="form-group">
                        <label htmlFor="todoText">Text</label>
                        <input ref={titleInput} type="text" className="form-control" id="todoText" value={todo.title || ""} onChange={onChangeTitle} />
                    </div>
                    <button className="float-right btn btn-primary" onClick={(e) => {e.preventDefault(); props.saveTodo(todo); history.goBack();}}>Save</button>
                    <button className="float-right btn btn-danger mr-2">Delete</button>
                </form>

            </div>
        </div>
        </>
    );
}