import React, { useEffect, useState } from 'react';
import '../styles/pages/Machines.scss';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

export default function Machines() {
    const navigate = useNavigate();
    const { user, Logout } = useAuth();
    const [storagedToken, setStoragedToken] = useState<string | null>(sessionStorage.getItem('@App:token'));

    // Logout
    function handleLogout() {
        setStoragedToken(sessionStorage.getItem('@App:token'));

        if (storagedToken === null) {
            Logout();
            navigate('/login');
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            handleLogout();
        }, 5);

        return () => clearInterval(interval);
    });

    return (
        <div className="wrapper">
            <div className="lateral-menu">
                <div className="options">
                    <ul>
                        <li>
                            <a href="/dashboard">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="/users">
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
                    <p>
                        {user?.name}
                    </p>
                    <a
                        href="/"
                        onClick={handleLogout}
                    >
                        <BsBoxArrowRight
                            size="24px"
                        />
                    </a>
                </div>
            </div>
            <div className="main-content">
                a
            </div>
        </div>
    );
}
