import React, { useState } from 'react';
import axios from "axios";
import { redirect } from 'react-router-dom';
import { useNavigate } from "react-router";



const SMSConfirmation = () => {
    const [smsCode, setSmsCode] = useState('');

    const navigate = useNavigate();


    function verifylogin() {

        axios.post('http://localhost:8000/api/session/sms', {
            code:smsCode
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            console.log(response);
        const data = response.data;
        sessionStorage.setItem('TokenUser', JSON.stringify(data.token));
        sessionStorage.setItem('UserId', JSON.stringify(data.id));

        
        navigate('/Home');

        }).catch(err => {//valida errores
            console.log("error: " + err);
            alert("Datos incorrectos");
        });

    }
    const onChange = (e) => {

        setSmsCode(e.target.value);
    }
    return (<>
        <div className="container1">
            <h1>Get an Verification Code</h1>
            <div id="contain" >
                <div className="tex_field">
                    <input className="email" type="text" value={smsCode} onChange={onChange} required />
                    <span></span>
                    <label>Confirmation</label>
                </div>
                <input type="submit" className="login" onClick={verifylogin} value="Confirm" />
                <div className="nores"><a href="/">Back Login</a></div>
            </div>
        </div>
    </>);
}

export default SMSConfirmation;