import React from 'react'
import { useSearchParams } from "react-router-dom";
import axios from "axios";


const ConfirmRegister = () => {

    const [params, searchParams] = useSearchParams();
    console.log(params.get('token'));

   
    axios.post('http://localhost:8000/api/user', {
                token: params.get('token')
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response);
                if (response) {
                    //navigate("/");
                }
            }).catch(err => {//valida errores
                console.log("error: " + err);
                alert("Datos incorrectos");
            });
    return (
        <div className='container'>
            <h1>Cuenta Registrada Correctamente</h1>
        </div>
    );

}

export default ConfirmRegister;