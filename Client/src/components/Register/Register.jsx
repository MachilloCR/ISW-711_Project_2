import React, { useState } from "react";
import { useNavigate } from "react-router"
import axios from "axios";


function Register(props) {

    let navigate = useNavigate();
    const Registrar = async (us, last, em, cont, phones) => {
        if (!us || !last || !em || !cont) {//se validan los campos llenos
            alert("Favor llenar todos los campos");
        } else {
            axios.post('http://localhost:8000/api/user/verify', {
                first_name: us,
                last_name: last,
                email: em,
                password: cont,
                phone: phones,
                role_id: 2
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response);
                if (response) {
                    navigate("/");
                }
            }).catch(err => {//valida errores
                console.log("error: " + err);
                alert("Datos incorrectos");
            });

        };

    };



    let [user, setUserse] = useState('');
    let [lastname, setlastname] = useState('');
    let [email, setEmail] = useState('');
    let [contra, setContra] = useState('');
    let [phone, setPhone] = useState('');
    return (
        <>
            <div className="registerContainer">
                <h1>Register</h1>
                <div className="registerForm">
                    <div className="tex_field">
                        <input className="email" type="text" onChange={ev => setUserse(ev.target.value)} required />
                        <span></span>
                        <label>Name</label>
                    </div>
                    <div className="tex_field">
                        <input className="email" type="text" onChange={ev => setlastname(ev.target.value)} required />
                        <span></span>
                        <label>Last Name</label>
                    </div>
                    <div className="tex_field">
                        <input className="email" type="email" onChange={ev => setEmail(ev.target.value)} required />
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div className="tex_field">
                        <input className="contra" type="password" onChange={ev => setContra(ev.target.value)} required />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div className="tex_field">
                        <input className="contra" type="phone" onChange={ev => setPhone(ev.target.value)} required />
                        <span></span>
                        <label>Phone</label>
                    </div>

                    <input type="submit" value="Register" className="btn-register" onClick={() => Registrar(user, lastname, email, contra, phone)} />
                    <div className="btn-noResgister">you are registered? <a href="/">login</a></div>
                </div>

            </div>
        </>
    );
}

export default Register;