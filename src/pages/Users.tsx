/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import '../styles/pages/Users.scss';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import api from '../services/api';

export default function Users() {
    const navigate = useNavigate();
    const { user, Logout } = useAuth();
    const [idUser, setIdUser] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userPoint, setUserPoint] = useState(0);
    const [storagedToken, setStoragedToken] = useState<string | null>(sessionStorage.getItem('@App:token'));

    async function getPoint() {
        // api.defaults.headers.common.Authorization = storagedToken;
        // const userPoints = await api.post('/get_points', { idUser });
        // const aux1 = userPoints.data.points[0]._sum.count;
        // const aux2 = userPoints.data.points[1]._sum.count;
        setUserPoint(60);
    }

    async function handleGetUsers() {
        api.defaults.headers.common.Authorization = storagedToken;
        const usersData = await api.get('/list_users');
        const users = usersData.data.users[0];
        if (!users) {
            console.log('Error');
        } else {
            setIdUser(users.id_user);
            setName(users.name);
            setLastName(users.last_name);
        }
    }

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

    useEffect(() => {
        handleGetUsers();
        const interval = setInterval(() => {
            console.log(userPoint);
            handleGetUsers();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

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
                            <a href="/users" id="user">
                                Users
                            </a>
                        </li>
                        {/* <li>
                            <a href="/machines">
                                Machines
                            </a>
                        </li> */}
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
                <div className="container-titulo">
                    <h1>
                        USERS
                    </h1>
                </div>
                <div className="container-users">
                    <table>
                        <thead>
                            <tr>
                                <th>NOME</th>
                                <th>SOBRENOME</th>
                                <th>PONTOS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {name}
                                </td>
                                <td>
                                    {lastName}
                                </td>
                                <td>
                                    {userPoint}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
