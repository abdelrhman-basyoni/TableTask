import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import '../css/LoginScreen.css'
import { post, setAuthorizationToken } from '../utils/apis'
const LoginScreen = ({history}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");



    const loginHandler = (e) => {
        e.preventDefault();
        var bodyFormdata = new FormData();
        bodyFormdata.append('username', username);
        bodyFormdata.append('password', password);


        const user = {
            username: username,
            password: password
        }
        console.log(user);
        const body = JSON.stringify(user);
       try {
        post('api/token/', bodyFormdata).then(res => {
            let cookies = new Cookies();
            let Token = res.data.access
            cookies.set('TOKEN', Token);
            setAuthorizationToken(Token)
            localStorage.setItem('authToken',res.data.access)
            history.push("/");
        }).catch(err => {
            console.log(err)
            setError(`${err}`);
            setTimeout(() => {
                setError("");
            }, 5000);

        })
           
       } catch (error) {
        setError(`${error}`);
            setTimeout(() => {
                setError("");
            }, 5000);
           
       }
        
       

    }

    return (
        <div style={{ marginLeft:'40%',marginTop:'10%'}}>
            <form onSubmit={loginHandler} className="login-screen__form">
                <h3 className="login-screen__title">Login</h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <label htmlFor="name">Username:</label>
                    <input type="text" required id="name" placeholder="Enter username" value={username}
                        onChange={(e) => setUsername(e.target.value)} />


                </div>



                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" required id="password" placeholder="Enter password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />


                </div>



                <button type="submit" className="btn btn-primary">Login</button>

                <span className="login-screen__subtext">Don't have an account? <Link to="/register">Register</Link></span>



            </form>
        </div>
    )
}

export default LoginScreen
