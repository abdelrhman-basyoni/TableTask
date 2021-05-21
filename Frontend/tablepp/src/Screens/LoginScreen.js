import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/LoginScreen.css'
import { post, get } from '../utils/apis'
const LoginScreen = () => {
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
        const config = {
            headers: {
                "content-type": "multipart/form-data"

            }
        }


        // try {
        //   post("api/token/",body).catch(err => {
        //       console.log(err)
        //       console.log(err.request)
        //       console.log(err.response)
        //       console.log(err.message)
        //   })
        get('table/').then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
            console.log(err.request)
            console.log(err.response)
            console.log(err.message)
        })
        // axios.post("api/token/",bodyFormdata,config).them(res =>{
        //     console.log(res)
        // })

        //  console.log(data);
        //  .then( function (res) {
        //      console.log(res);
        //  }).catch(err =>{
        //      console.log(err.response)
        //      console.log(err.request)
        //  })
        // console.log(axiosresponse);
        // const { data } = await axios.post("api/token/", bodyFormdata, config);
        // console.log(data);
        // if (data.status === 0) {
        //     setError(data.message);
        //     setTimeout(() => {
        //         setError("");
        //     }, 5000);
        // } else {
        //     localStorage.setItem("authToken", data.data.token);
        //     localStorage.setItem("username",data.data.username);
        //     // history.push("/join");
        // }

        // } catch (error) {
        //     setError(`${error}`);
        //     setTimeout(() => {
        //         setError("");
        //     }, 5000);
        // }



    }

    return (
        <div style={{ margin: 'auto' }}>
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
