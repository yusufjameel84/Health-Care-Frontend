import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/index';
// import {itemTotal} from './cartHelpers';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: '#ff9900'};
    } else {
        return {color: '#ffffff'}
    }
}

const Menu = (props) => {
    const {history} = props;
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                </li>
                {/* <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Shop</Link>
                </li> */}
               
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, '/user/dashboard')}
                            to="/user/dashboard">Dashboard</Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                style={isActive(history, '/admin/dashboard')}
                                to="/admin/dashboard">Dashboard</Link>

                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                style={isActive(history, '/user/dashboard')}
                                to="/user/dashboard">Profile Dashboard</Link>
                        </li>
                    </React.Fragment>
                )}
                {!isAuthenticated() && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Signup</Link>
                        </li>
                    </React.Fragment>
                )}

                {isAuthenticated() && isAuthenticated().user.role === "patient" && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/dashboard')} to="/user/dashboard">Dashboard</Link>
                        </li>
                    </React.Fragment>
                )}

                { isAuthenticated() && isAuthenticated().user.role === "doctor" && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/dashboard')} to="/doctor/dashboard">Dashboard</Link>
                        </li>
                    </React.Fragment>
                )}

                {isAuthenticated() && (
                    <div>
                        <li className="nav-item">
                            <span
                                className="nav-link"
                                style={{
                                cursor: 'pointer',
                                color: '#ffffff'
                            }}
                                onClick={() => signout(() => {
                                history.push("/");
                            })}
                                to="/signin">Signout</span>
                        </li>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default withRouter(Menu);
