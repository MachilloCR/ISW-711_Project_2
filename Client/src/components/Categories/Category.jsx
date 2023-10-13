import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from '../Header/header';
import Footer from '../Footer/Footer';
import "./categories.css"
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


const Category = () => {
    const [categories, setCategories] = useState([]);
    const loggeUser = JSON.parse(sessionStorage.getItem('TokenUser'));


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("http://localhost:8000/api/publicCat");
            setCategories(result.data);
        };

        fetchData();
    }, []);


    const handleDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm("¿Are you sure you want to delete the category?");
        if (result) {
            axios.delete('http://localhost:8000/api/category?id=' + id,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + loggeUser
                    }
                }).then(function (response) {
                    console.log(response);
                }).catch(err => {//valida errores
                    console.log("error: " + err);
                });
            setCategories((categories.filter((category) => category._id !== id)));
        }

    };


    return (
        <>
            {< Header />}
            <div className="catContainer">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id}>
                                <td>
                                    {category.name}
                                </td>
                                <td>
                                    <Button onClick={() => handleDelete(category._id)}>Delete</Button>  <Button href={`/CatEdit/${category._id}`}>Edit</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button href="/Categories">Add Category</Button>
            </div>
            {<Footer />}
        </>
    );
};


export default Category;