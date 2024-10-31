import React, { useState } from 'react';
import './Main.css'

function Main() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const accounts = [
        { username: 'user1', password: 'pass1' },
        { username: 'user2', password: 'pass2' },
        { username: 'user3', password: 'pass3' }
    ];

    const handleLogin = async (e) => {
        e.preventDefault();

        const account = accounts.find(acc => acc.username === username && acc.password === password);

        if (account) {
            // Lưu một thông báo vào localStorage khi đăng nhập thành công
            localStorage.setItem('loginStatus', 'success');
            alert("Đăng nhập thành công!");
            setError('');
        } else {
            setError('Thông tin đăng nhập không hợp lệ');
        }
        
        // Dữ liệu để gửi lên API
        const loginData = { username, password };

        try {
            // Gửi yêu cầu đăng nhập đến API
            const response = await fetch('https://api.example.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (response.ok) {
                // Lưu token vào localStorage khi đăng nhập thành công
                localStorage.setItem('token', data.token);
                alert("Đăng nhập thành công!");
            } else {
                // Xử lý khi đăng nhập thất bại
                setError(data.message || 'Thông tin đăng nhập không hợp lệ');
            }
        } catch (err) {
            console.error("Lỗi đăng nhập:", err);
            setError("Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}
  
  export default Main;