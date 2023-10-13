import { useNavigate } from 'react-router';
import React, { useState, useEffect } from "react";
import Header from '../Header/header';
import axios from "axios";
import "./newsource.css"
import Footer from '../Footer/Footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function NewSourcer(url, name, category_id) {

  const loggedUser = JSON.parse(sessionStorage.getItem('TokenUser'));
  const UserId = JSON.parse(sessionStorage.getItem('UserId'));
  console.log(category_id);

  axios.post('http://localhost:8000/api/newsource', {
    url: url,
    name: name,
    category_id: category_id,
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

};


function NewSource() {

  const navigate = useNavigate();

  let [url, setUrl] = useState('');
  let [name, setName] = useState('');
  let [category, setCategory] = useState('');

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/publicCat')
      .then(response => {
        setData(response.data);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const options = data.map(item => (
    <option key={item._id} value={item._id}>{item.name}</option>
  ));



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
            <Form.Control type="text" placeholder="Enter Source Name" onChange={ev => setName(ev.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="rss">
            <Form.Label>RSS URL</Form.Label>
            <Form.Control type="text" placeholder="RSS URL" onChange={ev => setUrl(ev.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Category" onChange={ev => setCategory(ev.target.value)}>
              {options}
            </Form.Select>
          </Form.Group>
          <Button href="/Source" type="submit" value="Save" onClick={() => NewSourcer(url, name, category, navigate)}>Save</Button>  <Button href="/Source">Edit</Button>
        </Form>
      </div>
      {<Footer />}
    </>

  );
}



export default NewSource;