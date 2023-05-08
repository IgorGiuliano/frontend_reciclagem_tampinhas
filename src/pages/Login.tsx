import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Login.scss';
import { useAuth } from '../contexts/auth';

export default function Login() {
    const navigate = useNavigate();
    const { signed, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (signed) {
            navigate('/dashboard');
        }
    }, [signed]);

    const routeChange = (path: string) => {
        navigate(path);
    };

    async function signUp(event: FormEvent) {
        event.preventDefault();
        email.toLocaleLowerCase();

        const passwordREGEX: RegExp = /^(?=.*[A-Z])(?=.*[!#@$%&-_])(?=.*[0-9])(?=.*[a-z]).{6,20}$/;

        if (!password.match(passwordREGEX)) {
            // eslint-disable-next-line max-len
            // window.alert('Senha inválida. Deve possuir:6 a 20 caracteres, pelo menos 1 número, pelo menos 1 maiúscula, pelo menos 1 minúcula, e pelo menos 1 caractere especial ( !#@$%&-_ )');
        }

        if (password.length < 6) {
            // window.alert('Senha com menos de 6 caracteres, favor revisar');
        } else {
            console.log();
            await login({
                email,
                password
            });
        }
    }

    return (
        <div className="wrapper-login">
            <header>
                <a href="/">
                    Projeto Integrador VII
                </a>
            </header>
            <main>
                <div className="container-login-register">
                    <div className="container-login">
                        <form onSubmit={signUp}>
                            <h1>
                                LOGIN
                            </h1>
                            <input
                                type="text"
                                placeholder="E-mail"
                                value={email}
                                onChange={
                                    (event) => setEmail(event.target.value)
                                }
                                required
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={
                                    (event) => setPassword(event.target.value)
                                }
                                required
                            />
                            <button type="submit">
                                Entrar
                            </button>
                            <a href="/login">Esqueci minha senha</a>
                        </form>
                    </div>
                    <div className="container-register">
                        <h1>
                            REGISTRE-SE
                        </h1>
                        <p>
                            Não possui uma conta? Crie uma agora mesmo!
                        </p>
                        <button onClick={() => routeChange('/register')}>
                            Registre-se
                        </button>
                    </div>
                </div>
            </main>
            <footer />
        </div>
    );
}
