/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import '../styles/pages/Dashboard.scss';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAuth } from '../contexts/auth';
import api from '../services/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, Logout } = useAuth();
    const [storagedToken, setStoragedToken] = useState<string | null>(sessionStorage.getItem('@App:token'));
    const [totalCaps, setTotalCaps] = useState(0);
    const [totalGreen, setTotalGreen] = useState(0);
    const [totalRed, setTotalRed] = useState(0);
    const [graphHour, setGraphHour] = useState<string[]>([]);
    const [graphCapData, setGraphCapData] = useState<number[]>([]);

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top' as const
            },
            title: {
                display: true,
                text: 'Quantidade de tampinhas coletadas'
            }
        },
        elements: {
            point: {
                radius: 4
            },
            line: {
                tension: 0.4
            }
        }
    };

    const data = {
        labels: graphHour,
        datasets: [
            {
                label: 'Quantidade',
                data: graphCapData,
                backgroundColor: 'rgba(255, 105, 180, 1)',
                borderColor: 'rgb(98, 84, 255)'
            }
        ]
    };

    // Logout
    function handleLogout() {
        setStoragedToken(sessionStorage.getItem('@App:token'));

        if (storagedToken === null) {
            Logout();
            navigate('/login');
        }
    }

    async function handleGetCapData() {
        api.defaults.headers.common.Authorization = storagedToken;
        const capData = await api.get('/get_collected_cap');
        console.log(capData);

        if (!capData.data) {
            console.log('Error');
        }

        if (capData.data[0]._sum.count !== null) {
            setTotalCaps(parseInt(capData.data[0]._sum.count, 10));
        }

        if (capData.data[1][0]) {
            setTotalGreen(capData.data[1][0]._sum.count);
        }

        if (capData.data[1][1]) {
            setTotalRed(capData.data[1][1]._sum.count);
        }

        if (capData.data[2][0]) {
            const count = capData.data[2].map((item: { count: number; }) => (item.count));
            const createdAt: string[] = [];
            capData.data[2].map((item: { createdAt: number; }) => {
                const hours = new Date(item.createdAt).getHours();
                const minutes = new Date(item.createdAt).getMinutes();
                const seconds = new Date(item.createdAt).getSeconds();
                const month = new Date(item.createdAt).getMonth();
                const dia = new Date(item.createdAt).getDate();
                const year = new Date(item.createdAt).getFullYear();
                createdAt.push(`${dia}/${month}/${year} ${hours}:${minutes}:${seconds}`);
                return null;
            });
            setGraphCapData(count.reverse());
            setGraphHour(createdAt.reverse());
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            handleLogout();
        }, 5);

        return () => clearInterval(interval);
    });

    useEffect(() => {
        handleGetCapData();
        const interval = setInterval(() => {
            handleGetCapData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

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
                            <a href="/users">
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
                        DASHBOARD
                    </h1>
                </div>
                <div className="container-dados">
                    <div className="vertical-boxes">
                        <div className="box">
                            <div className="text">
                                <p>Total de tampinhas coletadas neste mês</p>
                                <h2>
                                    {totalCaps}
                                </h2>
                            </div>
                        </div>
                        <div className="box">
                            <div className="color-green" />
                            <div className="text">
                                <h2>
                                    {totalGreen}
                                </h2>
                                <p>Tampinhas verdes coletadas neste mês</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="color-green" />
                            <div className="text">
                                <h2>
                                    {`${(totalGreen * 1.5).toFixed(2)} g`}
                                </h2>
                                <p>Peso estimado</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="color-red" />
                            <div className="text">
                                <h2>
                                    {totalRed}
                                </h2>
                                <p>Tampinhas vermelhas coletadas neste mês</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="color-red" />
                            <div className="text">
                                <h2>
                                    {`${(totalRed * 1.5).toFixed(2)} g`}
                                </h2>
                                <p>Peso estimado</p>
                            </div>
                        </div>
                        {/* <div className="box">
                            <h2>
                                150
                            </h2>
                            <p>Tampinhas azuis coletadas neste mês</p>
                        </div>
                        <div className="box">
                            <h2>
                                150
                            </h2>
                            <p>Tampinhas brancas coletadas neste mês</p>
                        </div>
                        <div className="box">
                            <h2>
                                150
                            </h2>
                            <p>Tampinhas mistas coletadas neste mês</p>
                        </div> */}
                    </div>
                    <div className="container-historico">
                        <div className="historico">
                            <p>Coleta total de tampinhas por mês</p>
                            <div className="grafico">
                                <Line
                                    data={
                                        data
                                    }
                                    options={
                                        options
                                    }
                                    className="linha"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
