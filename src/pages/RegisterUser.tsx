import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/pages/RegisterUser.scss';

export default function RegisterUser() {
    const role = 'NORMAL';
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function signIn(event: FormEvent) {
        event.preventDefault();
        email.toLocaleUpperCase();

        const passwordREGEX: RegExp = /^(?=.*[A-Z])(?=.*[!#@$%&-_])(?=.*[0-9])(?=.*[a-z]).{6,20}$/;

        if (!password.match(passwordREGEX)) {
            // eslint-disable-next-line max-len
            // window.alert('Senha inválida, favor inserir uma senha com o seguinte padrão: 6 a 20 caracteres, pelo menos 1 número, pelo menos 1 maiúscula, pelo menos 1 minúcula, e pelo menos 1 caractere especial ( !#@$%&-_ )');
        }

        const response = await api.post(
            '/register_user',
            {
                email,
                password,
                passwordConfirmation: confirmPassword,
                name,
                lastName,
                cpf,
                role
            }
        );

        if (response.data.registered) {
            navigate('/login');
        } else {
            console.log(response.data);
        }
    }

    return (
        <div className="wrapper-register">
            <header>
                <a href="/">
                    Projeto Integrador VII
                </a>
            </header>
            <main>
                <div className="container-reg">
                    <div className="container-registro">
                        <form onSubmit={signIn} id="form">
                            <h1>
                                Registre-se
                            </h1>
                            <div className="campos">
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    className="mediumInput"
                                    maxLength={150}
                                    value={name}
                                    onChange={
                                        (event) => setName(event.target.value)
                                    }
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Sobrenome"
                                    className="mediumInput"
                                    maxLength={150}
                                    value={lastName}
                                    onChange={
                                        (event) => setLastName(event.target.value)
                                    }
                                    required
                                />
                                <input
                                    type=""
                                    placeholder="CPF"
                                    className="mediumInput"
                                    minLength={11}
                                    maxLength={11}
                                    value={cpf}
                                    onChange={
                                        (event) => setCpf(event.target.value)
                                    }
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="mediumInput"
                                    maxLength={60}
                                    value={email}
                                    onChange={
                                        (event) => setEmail(event.target.value)
                                    }
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    className="mediumInput"
                                    minLength={6}
                                    maxLength={20}
                                    value={password}
                                    onChange={
                                        (event) => setPassword(event.target.value)
                                    }
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Confirme a senha"
                                    className="mediumInput"
                                    minLength={6}
                                    maxLength={20}
                                    value={confirmPassword}
                                    onChange={
                                        (event) => setConfirmPassword(event.target.value)
                                    }
                                    required
                                />
                            </div>
                            <button type="submit">
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <footer />
        </div>
    );
}
