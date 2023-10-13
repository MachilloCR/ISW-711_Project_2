
import React, { useState , useEffect} from "react";
import axios from "axios";
import Header from '../Header/header';
import Footer from '../Footer/Footer';
import "./categories.css"
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function CatEdit() {

    const { id } = useParams();
    let [name, setName] = useState('');

    const loggedUser = JSON.parse(sessionStorage.getItem('TokenUser'));

    //get category 
    useEffect(() => {
        axios.get('http://localhost:8000/api/category/?id=' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loggedUser
            }
        })
            .then(response => {
                setName(response.data.name);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
        console.log(name);
    }
    function HandleEdit() {

        // eslint-disable-next-line no-restricted-globals
        const result = confirm("¿Are you sure you want to change the category name?");
        if (result) {
            axios.put('http://localhost:8000/api/category/?id=' + id, {
                name: name
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + loggedUser
                }
            }).then(function (response) {
                console.log(response);
                alert("Category Updated Successfully!");
            }).catch(err => {//valida errores
                console.log("error: " + err);
            });
        }

    };

    return (
        <>
            {< Header />}
            <div class="catDataContainer">
                <h1>Categories</h1>
                <Form id="form" name="formulario">
                    <Form.Group className="mb-3" controlId="source">
                        <Form.Label >Category Name</Form.Label>
                        <Form.Control type="text" placeholder="Name"  value={name||""} onChange={handleNameChange} required />
                    </Form.Group>

                </Form>
                <Button type="submit" value="Edit" onClick={() => HandleEdit()}>Edit</Button>
                <Button href="/Category" type="submit" value="Back">Back</Button>
            </div>
            {< Footer />}
        </>
    );
}
export default CatEdit;