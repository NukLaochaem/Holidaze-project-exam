import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./sass/style.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "../src/pages/Admin";
import Contact from "../src/pages/Contact";
import Detail from "./pages/Detail";
import Hotels from "./pages/Hotels";
import Login from "../src/pages/Login";
import Home from "../src/pages/Home";
import { AuthProvider } from "./auth/AuthContex";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/hotels" element={<Hotels />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
