import "./App.css";
import React from "react";
import Login from "./components/Login/login";
import Register from "./components/Register/Register";
import Home from "./components/Home/home";
import {  useLocation } from 'react';
import { Route, Routes, useNavigate, } from "react-router-dom";
import Categories from "./components/Categories/Categories";
import NewSource from "./components/NewSource/NewSource";
import Category from "./components/Categories/Category";
import Source from "./components/NewSource/Source";
import CatEdit from "./components/Categories/CatEdit";
import SourceEdit from "./components/NewSource/SourceEdit";
import Passwordless from "./components/Login/passwordLess";
import SMSConfirmation from "./components/Login/SMSConfirmation";
import EmailSended from "./components/Login/EmailSended";
import ConfirmRegister from "./components/Register/ConfirmRegister";
function App() {

  const isLoggedIn = !!sessionStorage.getItem('TokenUser');
  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = ['/register', '/','/passwordLess','ConfirmRegister',''];

  if (!isLoggedIn && !publicRoutes.includes(location.pathname)) {
    navigate('/');
  }


  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />{" "}
        <Route path="/register" element={<Register />} />{" "}
        <Route path="/home" element={<Home />} />{" "}
        <Route path="/NewSource" element={<NewSource />} />{" "}
        <Route path="/Categories" element={<Categories />} />{" "}
        <Route path="/Category" element={<Category />} />{" "}
        <Route path="/Source" element={<Source />} />{" "}
        <Route path="/CatEdit/:id" element={<CatEdit />} />{" "}
        <Route path="/SourceEdit/:id" element={<SourceEdit />} />{" "}
        <Route path="/passwordLess" element={<Passwordless />} />{" "}
        <Route path="/ConfirmRegister" element={<ConfirmRegister />} />{" "}
        <Route path="/sms" element={<SMSConfirmation />} />
        <Route path="/passwordless/emailsended" element={<EmailSended />} />
      </Routes>
    </div>
  );
}

export default App;
