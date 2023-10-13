import React, { useState, useEffect } from "react";
import Header from '../Header/header';
import Footer from '../Footer/Footer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./style.css";
import { useSearchParams } from "react-router-dom";

function Home({ props }) {

  const [categories, setCategories] = useState([]);

  const [noticia, setNews] = useState([]);

  const [filterWord, setfilterWord] = useState("");

  //passwordless
  const [params, searchParams] = useSearchParams();
  console.log(params.get('tok'));
  if (params.get('tok') != null && params.get('use') != null) {
    sessionStorage.setItem('TokenUser', JSON.stringify(params.get('tok')));
    sessionStorage.setItem('UserId', JSON.stringify(params.get('use')));
  }
  // get all the categories
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8000/api/publicCat");
      setCategories(result.data);
    };

    fetchData();
  }, []);


  const loggeUser = JSON.parse(sessionStorage.getItem('TokenUser'));
  const UserId = JSON.parse(sessionStorage.getItem('UserId'));

  // eslint-disable-next-line
  useEffect(() => {
    const query = `
            query GetNews($userId: String) {
              news(user_id: $userId) {
                title
                short_description
                permalink
                date
                news_source_id
                category_id
                user_id
                imagen
              }
            }`;
    const variables = { userId: UserId };
    axios.post('http://localhost:3500/', { query, variables }).then(function (response) {

      setNews(response.data.data.news);
    }).catch(err => {
      console.log(err);
    });
    // eslint-disable-next-line
  }, []);

  const handleFilterNews = async () => {
    const query = `
    query NewsByWord($word: String,$userId: String) {
      newsByWord(word: $word,user_id: $userId) {
        short_description
        title
        category_id
        date
        news_source_id
        permalink
        user_id
        imagen
    }
    }`;
    const variables = { word: filterWord, userId: UserId };
    axios.post('http://localhost:3500/', { query, variables }).then(function (response) {
      console.log(response.data.data);
      setNews(response.data.data.newsByWord);
    }).catch(err => {
      console.log(err);
    });
  };

  const handleFilterNewsByCategory = async (category_id) => {
    console.log(category_id);
    const query = `
    query NewsByCategory($categoryId: String, $userId: String) {
      newsByCategory(category_id: $categoryId, user_id: $userId) {
        title
        user_id
        category_id
        date
        imagen
        news_source_id
        permalink
        short_description
      }
    }`;
    const variables = { categoryId: category_id, userId: UserId };
    axios.post('http://localhost:3500/', { query, variables }).then(function (response) {
      console.log(response.data.data);
      setNews(response.data.data.newsByCategory);
    }).catch(err => {
      console.log(err);
    });
  };
  return (
    <>
      {<Header />}
      <div className="homeTitle">
        <h1>Your News</h1>
      </div>
      <div className="searchContainer">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon"
            onChange={ev => setfilterWord(ev.target.value)} />
          <Button variant="primary" id="button-addon" onClick={() => handleFilterNews()} >
            🔎
          </Button>
        </InputGroup>
      </div>
      <div className="categoryButtonsContainer">
        {categories.map((category) => (
          <Button onClick={() => handleFilterNewsByCategory(category._id)}>{category.name}</Button>
        ))}
      </div>
      <div className='newsContainer'>
        {noticia.map((newx) => (
          <Card style={{ width: '18rem' }} key={newx._id}>
            <Card.Img variant="top" src={newx.imagen} />
            <Card.Body>
              <Card.Title>{newx.title}</Card.Title>
              <p>{newx.short_description}</p>
              <Button href={newx.permalink}>Visit New</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      {<Footer />}
    </>
  );
}
export default Home;