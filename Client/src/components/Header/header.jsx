import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PageLogo from "../img/pagelogo.png";
import "./style.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSearchParams } from "react-router-dom";


function Header(props) {
    const navigate = useNavigate();
    
    let [loggedUser, setval] = useState(JSON.parse(sessionStorage.getItem('TokenUser')));


    const Cerrar = () => {
        sessionStorage.clear();
        setval("");
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/home"><img
                    src={PageLogo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                /></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/NewSource">New Sources</Nav.Link>
                    <Nav.Link href="/Categories">Categories</Nav.Link>
                    <Nav.Link href="/" onClick={() => Cerrar()}> Log Out</Nav.Link>
                </Nav>

            </Container>

        </Navbar>




    );
}

export default Header;
