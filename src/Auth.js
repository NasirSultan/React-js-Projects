import React, { useState } from 'react';

const Auth = () => {
    const [activeTab, setActiveTab] = useState('register');  // To toggle between Register and Login
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',  // Default role is 'user'
        errorMessage: '',
        user: null,
        token: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission (Register or Login)
    const handleSubmit = async (e) => {
        e.preventDefault();

        let url = '';
        let method = '';
        let data = {};

        // Depending on active tab, set URL and method
        if (activeTab === 'register') {
            url = 'http://127.0.0.1:8000/api/register';  // Updated URL for local registration endpoint
            method = 'POST';
            data = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role  // Include role in the registration data
            };
        } else if (activeTab === 'login') {
            url = 'http://127.0.0.1:8000/api/login';  // Updated URL for local login endpoint
            method = 'POST';
            data = {
                email: formData.email,
                password: formData.password
            };
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || responseData.error || 'An error occurred');
            }

            // Successful registration/login
            if (activeTab === 'register') {
                alert('User registered successfully!');
            } else if (activeTab === 'login') {
                alert('Login successful!');
            }

            // Store user data or token (you can save this in localStorage or context)
            setFormData({
                ...formData,
                user: responseData.user,
                token: responseData.token || ''
            });

        } catch (error) {
            console.error('Error:', error);
            setFormData({
                ...formData,
                errorMessage: error.message
            });
        }
    };

    return (
        <div>
            <h1>React Authentication</h1>

            <div>
                <button onClick={() => setActiveTab('register')}>Register</button>
                <button onClick={() => setActiveTab('login')}>Login</button>
            </div>

            {activeTab === 'register' && (
                <div>
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Role:</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        {formData.errorMessage && (
                            <div style={{ color: 'red' }}>{formData.errorMessage}</div>
                        )}
                        <button type="submit">Register</button>
                    </form>
                </div>
            )}

            {activeTab === 'login' && (
                <div>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {formData.errorMessage && (
                            <div style={{ color: 'red' }}>{formData.errorMessage}</div>
                        )}
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}

            {/* Show user info after login */}
            {formData.user && (
                <div>
                    <h3>Welcome, {formData.user.name}</h3>
                    <p>Your role: {formData.user.role}</p>
                    <p>Your token: {formData.token}</p>
                </div>
            )}
        </div>
    );
};

export default Auth;
