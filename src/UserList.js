import { NavLink } from "react-router-dom";
import BreadCrumbList from './BreadCrumbList';
import useFetch from './hooks/useFetch';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function UserList() {

    const [users, error] = useFetch("https://jsonplaceholder.typicode.com/users");

    // useEffect(function() {
    //     const t = setTimeout(function() {
    //         setUsers([
    //             {
    //                 id: 100,
    //                 name: "Michiel van Eerd"
    //             }
    //         ]);
    //     }, 5000);
    //     return () => clearTimeout(t);
    // });

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