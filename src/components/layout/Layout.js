import { Nav, Container, Navbar } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "../../pages/admin";
import Booking from "../../pages/booking";
import Contact from "../../pages/contact";
import HotelDetails from "../../pages/hotelDetails";
import Hotels from "../../pages/hotels";
import Login from "../../pages/login";
import Home from "../../pages/home";

function Layout() {
  return (
    <>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/hotels">Hotels</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

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
    </>
  );
}

export default Layout;
