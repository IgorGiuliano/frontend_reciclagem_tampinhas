/* eslint-disable react/jsx-no-useless-fragment */
import React, { ReactNode } from 'react';
import {
    BrowserRouter as Router, Routes, Route, Navigate
} from 'react-router-dom';
import CommonHome from './pages/CommonHome';
import Login from './pages/Login';
import './styles/Global.scss';

// function ProtectedRoute({ children }: { children: ReactNode }) {
//     const storagedUser = sessionStorage.getItem('@App:cod');
//     const storagedToken = sessionStorage.getItem('@App:token');

//     if (!storagedToken && !storagedUser) {
//         return <Navigate to="/unauthorized" replace />;
//     }

//     return <>{children}</>;
// }

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CommonHome />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}
