import React from 'react';
import '../styles/pages/Users.scss';

export default function Users() {
    return (
        <div className="wrapper">
            <div className="lateral-menu">
                <div className="options">
                    <ul>
                        <li>
                            <a href="/dashboard" id="dashboard">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="/users" id="user">
                                Users
                            </a>
                        </li>
                        <li>
                            <a href="/machines" id="machine">
                                Machines
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="user-logout">
                    Igor Giuliano
                </div>
            </div>
            <div className="main-content">
                a
            </div>
        </div>
    );
}
