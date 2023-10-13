
import { useNavigate } from 'react-router';
import React, { useState} from "react";
import axios from "axios";
import Header from '../Header/header';
import Footer from '../Footer/Footer';
import "./categories.css"
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';




function Categories() {

    function Category(name) {

        const loggedUser = JSON.parse(sessionStorage.getItem('TokenUser'));

        axios.post('http://localhost:8000/api/category', {
            name: name
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loggedUser
            }
        }).then(function (response) {
            console.log(response);

        }).catch(err => {//valida errores
            console.log("error: " + err);
        });
    };

    const navigate = useNavigate();

    let [name, setName] = useState('');

    return (

        <>
            {<Header />}
            <div className="catDataContainer">
                <h1>Categories</h1>
                <Form id="form" name="formulario">
                    <Form.Group className="mb-3" controlId="source">
                        <Form.Label >Category Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" onChange={ev => setName(ev.target.value)} required />
                    </Form.Group>

                </Form>
                <Button href="/Category" type="submit" value="Save" onClick={() => Category(name, navigate)}>Save</Button> <Button href="/Category">Edit</Button>
            </div>
            {<Footer />}
        </>
    );
}
export default Categories;