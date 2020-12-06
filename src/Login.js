import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BreadCrumbList from './BreadCrumbList';
import { AuthContext } from './hooks/useAuth';

export default function Login() {

    const auth = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const history = useHistory();

    function login() {
        if (!email || !pwd) {
            alert("Enter all required fields");
            return;
        }
        auth.setIsAuth(true);
        history.push("/users");
    }

    return (
        <>
            <BreadCrumbList />
            <div className="row">
                <div className="col">
                    <form>
                        <div className="form-group">
                            <label htmlFor="emailInput">Email address</label>
                            <input type="email" className="form-control" id="emailInput" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwdInput">Email address</label>
                            <input type="password" className="form-control" id="pwdInput" onChange={(e) => setPwd(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); login(); }}>Login</button>
                    </form>
                </div></div>
        </>
    );
}