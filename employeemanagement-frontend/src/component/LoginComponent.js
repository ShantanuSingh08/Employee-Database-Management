import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/AuthService';

const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [isLogin, setIsLogin] = useState(true); 
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Login handler
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password || !companyName) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        try {
            const res = await AuthService.login({ email, password, companyName });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('companyName', companyName);

            setErrorMessage('');
            setSuccessMessage('Login successful!');
            navigate('/employee'); // Navigate to dashboard
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
            setSuccessMessage('');
        }
    };

    // Registration handler
    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email || !password || !companyName) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        try {
            const res = await AuthService.register({ email, password, companyName });
            setErrorMessage('');
            setSuccessMessage('Registration successful! You can now log in.');
            setIsLogin(true); 
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center">{isLogin ? 'Company Login' : 'Company Registration'}</h2>
                    <div className="card-body">
                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        {successMessage && (
                            <div className="alert alert-success" role="alert">
                                {successMessage}
                            </div>
                        )}
                        <form onSubmit={isLogin ? handleLogin : handleRegister}>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Enter Company Name"
                                    required
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Email"
                                    required
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Password"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                {isLogin ? 'Login' : 'Register'}
                            </button>
                        </form>
                        <div className="text-center mt-3">
                            <button
                                type="button"
                                className="btn btn-link"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setErrorMessage('');
                                    setSuccessMessage('');
                                }}
                            >
                                {isLogin
                                    ? "Don't have an account? Register here."
                                    : 'Already have an account? Login here.'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthComponent;
