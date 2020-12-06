import { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from './hooks/useAuth';

export default function BreadCrumbList(props) {

    const auth = useContext(AuthContext);
    const history = useHistory();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to={auth.isAuth ? "/users" : "/"}>Navbar</NavLink>
                <ul className="navbar-nav mr-auto"></ul>
                {auth.isAuth ? <a className="nav-link" href="/logout" onClick={(e) => { e.preventDefault(); auth.setIsAuth(false); history.push("/"); }}>Logout</a> : null}
            </nav>
            <nav>
                <ol className="breadcrumb">
                    { auth.isAuth ? <li key={"/users"} className="breadcrumb-item"><NavLink to="/users">Users</NavLink></li> : null }
                    {props.breadCrumbs ? props.breadCrumbs.map(function (bc, index, list) {
                        if (index + 1 === list.length) {
                            return <li key={index} className="breadcrumb-item active">{bc.title}</li>
                        } else {
                            return <li key={index} className="breadcrumb-item"><NavLink to={bc.path}>{bc.title}</NavLink></li>
                        }
                    }) : null}
                </ol>
            </nav>
        </>
    );
}