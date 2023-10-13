import { useNavigate } from 'react-router';
import React, { useState, useEffect } from "react";
import Header from '../Header/header';
import axios from "axios";
import "./newsource.css"
import Footer from '../Footer/Footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';


function SourceEdit() {

    const loggedUser = JSON.parse(sessionStorage.getItem('TokenUser'));
    const UserId = JSON.parse(sessionStorage.getItem('UserId'));

    const [categoryList, setCategoryList] = useState([]);
    //get the category list
    useEffect(() => {
        axios.get('http://localhost:8000/api/publicCat')
            .then(response => {
                setCategoryList(response.data);

            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    //fill the combobox whit the categorys
    const options = categoryList.map(item => (
        <option key={item._id} value={item._id}>{item.name}</option>
    ));

    //source id
    const { id } = useParams();
    let [url, setUrl] = useState('');
    let [name, setName] = useState('');
    let [category, setCategory] = useState('');

    //fill the inputs whit the source info
    useEffect(() => {
        axios.get('http://localhost:8000/api/newsource/?id=' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loggedUser
            }
        })
            .then(response => {
                setUrl(response.data.url);
                setName(response.data.name);
                setCategory(response.data.category_id);
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
        console.log(name);
    }
    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    }
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    function HandleEditSource() {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm("¿Are you sure you want to change the category name?");
        if (result) {
            axios.put('http://localhost:8000/api/newsource/?id=' + id, {
                url: url,
                name: name,
                category_id: category,
                user_id: UserId
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
        }
    };


    return (

        <>
            {<Header />}
            <div>
                <h1> News Source </h1>
            </div>
            <div className="sourceDataContainer">
                <Form id="form" name="formulario">
                    <Form.Group className="mb-3" controlId="source">
                        <Form.Label >Source Name</Form.Label>
                        <Form.Control type="text" placeholder="Source Name" value={name || ""} onChange={handleNameChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="rss">
                        <Form.Label>RSS URL</Form.Label>
                        <Form.Control type="text" placeholder="RSS URL" value={url || ""} onChange={handleUrlChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Select aria-label="Category" value={category || ""} onChange={handleCategoryChange}>
                            {options}
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit" value="Save" onClick={() => HandleEditSource()}>Edit</Button>  <Button href="/Source">Back</Button>
                </Form>
            </div>
            {<Footer />}
        </>

    );
}
export default SourceEdit;