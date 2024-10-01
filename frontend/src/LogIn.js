import React, { useState } from 'react';
import axios from 'axios';
import './LogIn.css'; // Import your CSS file

const UserAuthentication = ({ username, setUsername, password, setPassword,
                              loggedInUser, setLoggedInUser
                         }) => {
    
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            setLoggedInUser(response.data.user);
            setError('');
            setUsername('');
            setPassword('');
        } catch (error) {
            setLoggedInUser(null);
            setError('Invalid username/email or password.');
        }
    };

    const handleLogout = async () => {
        setUsername('');
        setPassword('');
        setLoggedInUser(null);
    };

    return (
        <div className="signup-container">
            <h2>Log In</h2>
            {message && <p className="message">{message}</p>}
            {loggedInUser ? (
                <div>
                    <p>Welcome, {loggedInUser.firstName}!</p>
                    <button className="button" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Username or Email"
                        className="input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="button" onClick={handleLogin}>Login</button>
                    {error && <p className="error">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default UserAuthentication;
