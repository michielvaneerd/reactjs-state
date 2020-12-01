import { NavLink } from "react-router-dom";
import BreadCrumbList from './BreadCrumbList';
import { useSimpleFetch } from './hooks/useFetch';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function UserList() {

    const [ users, setUsers, error ] = useSimpleFetch("https://jsonplaceholder.typicode.com/users");

    if (error) {
        return <div className="alert alert-danger mt-5">Error: {error.toString()}</div>
    }

    if (!users) {
        return <div className="alert alert-info mt-5">Loading data...</div>
    }

    return (
        <>
            <BreadCrumbList />
            <TransitionGroup>
                <CSSTransition in={true} appear={true} classNames="fader" timeout={600}>
                    <div className="row">
                        <div className="col">
                            {users.map(function (user) {
                                return (<div className="card mt-2" key={user.id}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <NavLink to={"/users/" + user.id}>{user.name}</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>);
                            })}
                        </div>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </>
    );

}