import { NavLink } from 'react-router-dom';

export default function BreadCrumbList(props) {
    return (
        <nav>
            <ol className="breadcrumb">
                <li key={"/"} className="breadcrumb-item"><NavLink to="/">Users</NavLink></li>
                {props.breadCrumbs ? props.breadCrumbs.map(function (bc, index, list) {
                    if (index + 1 === list.length) {
                        return <li key={index} className="breadcrumb-item active">{bc.title}</li>
                    } else {
                        return <li key={index} className="breadcrumb-item"><NavLink to={bc.path}>{bc.title}</NavLink></li>
                    }
                }) : null}
            </ol>
        </nav>
    );
}