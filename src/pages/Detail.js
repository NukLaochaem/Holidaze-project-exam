import Layout from "../components/layout/Layout";
import { Container, Carousel, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Your first name must be at least 3 characters"),

  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
});

export default function HotelDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function booking(data) {
    console.log(data);
  }

  return (
    <Layout>
      <Container>
        <Carousel interval={null} variant="dark">
          <Carousel.Item>
            <img
              className="image-slider d-block w-400"
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
              className="image-slider d-block w-100"
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
              className="image-slider d-block w-100"
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

        <div className="detail-container mb-5">
          <h1 className="">Hotel name</h1>
          <h5 className="">1200 Nok / Night</h5>
          <p className="">Location bergen, near fish market etc.</p>
          <h4 className="">Facilities</h4>
          <p className="my-4">
            <i className="fa-solid fa-bed fa-lg mx-5"></i>
            <i className="fa-solid fa-hotel fa-lg mx-5"></i>
            <i className="fa-solid fa-map-location-dot fa-lg mx-5"></i>
            <i className="fa-solid fa-ban-smoking fa-lg mx-5"></i>
          </p>
          <h4 className="">Description</h4>
          <p className="">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio.
          </p>
          <Button className="btn-lg" onClick={handleShow}>
            Book Now
          </Button>
        </div>

        <div className="modal-container">
          <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit(booking)} className="modal-container">
              <Modal.Header closeButton>
                <Modal.Title>Your Booking</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="alert success-alert">
                  <h5>Success Alert Message</h5>
                </div>

                <h4>Hotel name</h4>

                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    placeholder="Enter your name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <Form.Text className="error">
                      {errors.name.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    placeholder="Enter email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <Form.Text className="error">
                      {errors.email.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <p>Check in / Check out</p>
                <RangeDatePicker
                  startDate={new Date()}
                  endDate={new Date()}
                  dateFormat="DD MMM YYYY"
                  monthFormat="DD MMM YYYY"
                  className="date-picker"
                />
              </Modal.Body>
              <Modal.Footer>
                <h5>Total: 1300</h5>
                <Button className="btn-lg btn-modal" type="submit">
                  Book
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </Container>
    </Layout>
  );
}
