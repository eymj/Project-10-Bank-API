import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { loggedIn } from '../features/auth/authSlice'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3001' }/api/v1/user/login`, {
                email,
                password,
            })

            const token = response.data.body.token
            dispatch(loggedIn(token))
            console.log(token)
            navigate('/profile', {replace: true}) 
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Username</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    )
}
