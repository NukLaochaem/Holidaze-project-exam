import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./sass/style.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "../src/pages/Admin";
import Booking from "../src/pages/Booking";
import Contact from "../src/pages/Contact";
import HotelDetails from "./pages/HotelDetails";
import Hotels from "./pages/Hotels";
import Login from "../src/pages/Login";
import Home from "../src/pages/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/hotels" element={<Hotels />}></Route>
        <Route path="/hotelDetails/:id" element={<HotelDetails />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
