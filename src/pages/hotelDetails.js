import Layout from "../components/layout/Layout";
import { Container, Carousel, Button, Modal } from "react-bootstrap";
import { useState } from "react";

import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";

export default function HotelDetails() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Layout>
      <Container>
        <Carousel interval={null} variant="dark">
          <Carousel.Item>
            <img
              className="d-block w-400"
              src="holder.js/800x400?text=First slide&bg=373940"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Second slide&bg=282c34"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div className="detail-container">
          <h1 className="">Hotel name</h1>
          <h5 className="">Price / Night</h5>
          <p className="">Location bergen, near fish market etc.</p>
          <h4 className="">Facilities</h4>
          <p className="">icon icon icon</p>
          <h4 className="">Description</h4>
          <p className="">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio.
          </p>
          <Button onClick={handleShow}>Book</Button>
        </div>

        <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Your Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal-container">
                <p>Check in / Check out</p>
                <RangeDatePicker
                  startDate={new Date()}
                  endDate={new Date()}
                  dateFormat="DD MMM YYYY"
                  monthFormat="DD MMM YYYY"
                  className="date-picker"
                />
                <h4>Hotel name</h4>
                <p>Price</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Book
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </Layout>
  );
}
