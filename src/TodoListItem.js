import { NavLink, useParams } from "react-router-dom";

export default function TodoListItem(props) {

    const params = useParams();

    return (
        <div className="card mt-2">
            <div className="card-body">
                <div className="row">
                    <div className="col-1">
                        <input type="checkbox" checked={props.todo.completed} onChange={() => props.toggleCompleted(props.todo.id)} />
                    </div>
                    <div className="col-10">
                        <NavLink to={"/users/" + params.userid + "/" + props.todo.id}>{props.todo.title}</NavLink>
                    </div>
                    <div className="col-1">
                        <button type="button" className="close float-right" onClick={() => props.deleteTodo(props.todo.id)}>
                            <span className="text-danger">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}