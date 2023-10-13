import React, { useState, useEffect } from "react";
import Header from '../Header/header';
import axios from "axios";
import "./newsource.css"
import Footer from '../Footer/Footer';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';




const Source = () => {
    const [sources, setSource] = useState([]);

    const loggeUse = JSON.parse(sessionStorage.getItem('TokenUser'));
    const UserId = JSON.parse(sessionStorage.getItem('UserId'));
    useEffect(() => {
        axios.get('http://localhost:8000/api/usersources/' + UserId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loggeUse
            }
        }).then(function (response) {
            setSource(response.data)


        }).catch(err => {//valida errores
            console.log("error: " + err);
        });
    }, []);


    const handleDelete = async (id) => {

        // eslint-disable-next-line no-restricted-globals
        const result = confirm("¿Are you sure you want to delete the Source?");
        if (result) {
            axios.delete('http://localhost:8000/api/newsource?id=' + id,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + loggeUse
                    }
                }).then(function (response) {
                    console.log(response);

                }).catch(err => {//valida errores
                    console.log("error: " + err);
                });
            setSource((sources.filter((source) => source._id !== id)));
            console.log(id);
        }
    };



    return (
        <>
            {< Header />}
            <div className="sourcesContainer">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sources.map((sourc) => (
                            <tr key={sourc._id}>
                                <td>
                                    {sourc.name}
                                </td>
                                <td>
                                    {sourc.category_id}
                                </td>
                                <td>
                                    <Button onClick={() => handleDelete(sourc._id)}>Delete</Button>  <Button href={`/SourceEdit/${sourc._id}`}>Edit</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button href="/NewSource">Add Source</Button>
            </div>
            {<Footer />}
        </>
    );
};


export default Source;