/* eslint-disable react/jsx-no-useless-fragment */
import React, { ReactNode } from 'react';
import {
    BrowserRouter as Router, Routes, Route, Navigate
} from 'react-router-dom';
import CommonHome from './pages/CommonHome';
import Login from './pages/Login';
import './styles/Global.scss';
import Dashboard from './pages/Dashboard';

function ProtectedRoute({ children }: { children: ReactNode }) {
    const storagedUser = sessionStorage.getItem('@App:cod');
    const storagedToken = sessionStorage.getItem('@App:token');

    if (!storagedToken && !storagedUser) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CommonHome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                    path="/protegida"
                    element={(
                        <ProtectedRoute>
                            <CommonHome />
                        </ProtectedRoute>
                    )}
                />
                <Route path="/unauthorized" element={<CommonHome />} />
                <Route path="/not-found" element={<CommonHome />} />
            </Routes>
        </Router>
    );
}
