import React from 'react';
import '../styles/pages/Dashboard.scss';

export default function Dashboard() {
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
                            <a href="/user" id="user">
                                Users
                            </a>
                        </li>
                        <li>
                            <a href="/machine" id="machine">
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
                <div className="container-titulo">
                    {/* <h1>
                        DASHBOARD
                    </h1> */}
                </div>
                <div className="container-dados">
                    <div className="vertical-boxes">
                        <div className="box">
                            <p>Total de tampinhas coletadas neste mês</p>
                            <h2>
                                750
                            </h2>
                        </div>
                        <div className="box">
                            <h2>
                                150
                            </h2>
                            <p>Tampinhas vermelhas coletadas neste mês</p>
                        </div>
                        <div className="box">
                            <h2>
                                150
                            </h2>
                            <p>Tampinhas verdes coletadas neste mês</p>
                        </div>
                        <div className="box">
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
                        </div>
                    </div>
                    <div className="container-historico">
                        <div className="historico">
                            <p>Coleta total de tampinhas por mês</p>
                            <div className="grafico">
                                <a href="">
                                    gráfico
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
