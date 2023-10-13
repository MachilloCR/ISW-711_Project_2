import React, { useState } from "react";
import { useNavigate } from "react-router"
import axios from "axios";
import "./style.css";


function Passwordless(props) {

    const navigate = useNavigate();
    const Logival = (email, contra) => {

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
            axios.post('http://localhost:8000/api/passwordless', {
                email,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                if (response) {
                    navigate("/passwordless/emailsended");
                };
            }).catch(err => {//valida errores
                console.log("error: " + err);
                alert("Something went wrong");
            });

        };

    }
    let [email, setEmail] = useState('');
    return (
        <>
            <div className="container1">
                <h1>Login</h1>
                <div id="contain" >
                    <div className="tex_field">
                        <input className="email" type="text" onChange={ev => setEmail(ev.target.value)} required />
                        <span></span>
                        <label>Email</label>
                    </div>
                    <input type="submit" className="login" value="login" onClick={() => Logival(email, navigate)} />
                    <div className="nores"><a href="/">Back Login</a></div>
                </div>
            </div>
        </>
    );
}

export default Passwordless;