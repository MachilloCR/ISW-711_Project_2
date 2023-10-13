import React, { useState } from "react";
import { useNavigate } from "react-router"
import axios from "axios";
import "./style.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Logival(email, contra, navigate) {
    
    let Dateuser = "";
    if (!email || !contra) {
        if (!email && contra) {
            alert("Favor introducir un Email");
        } if (!contra && email) {
            alert("Favor introducir una contraseña");
        } if (!email && !contra) {
            alert("Favor Llenar los campos");
        }
    } else {
        axios.post('http://localhost:8000/api/session', {
            email: email,
            password: contra
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            console.log(response);
    
            if (response.data.status === 1) {
                navigate('/sms', { email });
            }
            // };
        }).catch(err => {//valida errores
            console.log("error: " + err);
            alert("Datos incorrectos");
        });

    };

}


function Login(props) {

    const navigate = useNavigate();

    let [email, setEmail] = useState('');
    let [contra, setContra] = useState('');


    return (
        <>
            <div className="loginContainer">
                <h1>Login</h1>
                <div className="loginForm" >
                    <div className="tex_field">
                        <input className="email" type="text" onChange={ev => setEmail(ev.target.value)} required />
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div className="tex_field">
                        <input className="contra" type="password" onChange={ev => setContra(ev.target.value)} required />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <input type="submit" className="btn-login" value="login" onClick={() => Logival(email, contra, navigate)} />
                    <div className="btn-passwordless"><a href="/passwordLess">passwordLess</a></div>
                    <div className="btn-noResgister">You are not registered?<a href="/Register"> Signup</a></div>
                </div>
            </div>
        </>
    );
}

export default Login;