import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../utils/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/admin-dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        try {
            const response = await apiClient.post('/api/login', {
                email,
                password
            });

            const { token, user, message } = response.data;

            // Store token and user data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Show success message
            toast.success(message || 'Login successful!');

            // Redirect based on role
            if (user.role === 1) {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'Login failed. Please try again.';
            setErrorMessage(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 p-4 sm:p-8">
            <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
                {/* Login Form */}
                <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 sm:p-10">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-amber-900">Welcome Back</h2>
                            <p className="mt-2 text-amber-700">Sign in to your account</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {errorMessage && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-red-700 font-medium">{errorMessage}</p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-1">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FontAwesomeIcon icon={faEnvelope} className="text-amber-500" />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="block w-full pl-10 pr-3 py-3 border border-amber-300 rounded-lg bg-amber-50 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white placeholder-amber-400 text-amber-900 transition-all"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-amber-800 mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FontAwesomeIcon icon={faLock} className="text-amber-500" />
                                        </div>
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="block w-full pl-10 pr-3 py-3 border border-amber-300 rounded-lg bg-amber-50 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white placeholder-amber-400 text-amber-900 transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-amber-800">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link to="/forget-password" className="font-medium text-amber-600 hover:text-amber-700">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${isLoading ? 'bg-amber-600 cursor-not-allowed' : 'bg-amber-700 hover:bg-amber-800 focus:ring-amber-500'}`}
                                >
                                    {isLoading ? (
                                        <>
                                            <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                            Signing in...
                                        </>
                                    ) : 'Sign in'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-amber-700">
                                Don't have an account?{' '}
                                <Link to="/register" className="font-medium text-amber-600 hover:text-amber-800">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Test Credentials */}
                <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl text-red-500 overflow-hidden">
                    <div className="h-full p-8 sm:p-10 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2">Demo Access</h3>
                            <p className="text-amber-100">Try out our platform with these test credentials</p>
                        </div>

                        <div className="space-y-6 text-red-500">
                            <div className="bg-white bg-opacity-10 p-5 rounded-xl text-black drop-blur-sm">
                                <h4 className="text-lg font-semibold mb-3 text-">Admin Account</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <span className="w-20 text-amber-900">Email:</span>
                                        <span className="font-mono bg-white bg-opacity-20 px-2 py-1 rounded">admin@test.com</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-20 text-amber-900">Password:</span>
                                        <span className="font-mono bg-white bg-opacity-20 px-2 py-1 rounded">12345</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white bg-opacity-10 p-5 text-black rounded-xl backdrop-blur-sm">
                                <h4 className="text-lg font-semibold mb-3 ">User Account</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <span className="w-20 text-amber-900">Email:</span>
                                        <span className="font-mono bg-white bg-opacity-20 px-2 py-1 rounded">user@test.com</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-20 text-amber-900">Password:</span>
                                        <span className="font-mono bg-white bg-opacity-20 px-2 py-1 rounded">12345</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-5 border-t border-amber-500 border-opacity-30">
                            <p className="text-sm text-amber-200 italic">
                                Note: These credentials are for demonstration purposes only.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;