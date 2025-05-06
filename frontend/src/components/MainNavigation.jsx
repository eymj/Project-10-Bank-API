import { Link } from "react-router";
import { useSelector, useDispatch } from 'react-redux'
import {
    loggedOut
} from '../features/auth/authSlice'

export default function MainNavigation() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const firstName = useSelector(state => state.profile.firstName)

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src="./img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {token ?
                <div className="main-nav-flex">
                    <Link className="main-nav-item main-nav-flex" to="/profile">
                        <i className="fa fa-user-circle"></i>
                        {firstName}
                    </Link>
                    <Link className="main-nav-item main-nav-flex" to="#" onClick={() => dispatch(loggedOut())}>
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </Link>
                </div>
                :
                <div>
                    <Link className="main-nav-item main-nav-flex" to="/login">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                </div>
            }
        </nav>
    );
}
