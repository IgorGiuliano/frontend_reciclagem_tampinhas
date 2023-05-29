/* eslint-disable react/jsx-no-useless-fragment */
import React, { ReactNode } from 'react';
import {
    BrowserRouter as Router, Routes, Route, Navigate
} from 'react-router-dom';
import CommonHome from './pages/CommonHome';
import Login from './pages/Login';
import './styles/Global.scss';
import Dashboard from './pages/Dashboard';
import Machines from './pages/Machines';
import Users from './pages/Users';
import RegisterUser from './pages/RegisterUser';
import { AuthProvider } from './contexts/auth';

function ProtectedRoute({ children }: { children: ReactNode }) {
    const storagedToken = sessionStorage.getItem('@App:token');

    if (!storagedToken) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* <Route path="/" element={<CommonHome />} /> */}
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<RegisterUser />} />
                    <Route
                        path="/dashboard"
                        element={(
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/machines"
                        element={(
                            <ProtectedRoute>
                                <Machines />
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/users"
                        element={(
                            <ProtectedRoute>
                                <Users />
                            </ProtectedRoute>
                        )}
                    />
                    <Route path="/unauthorized" element={<CommonHome />} />
                    <Route path="/not-found" element={<CommonHome />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}
