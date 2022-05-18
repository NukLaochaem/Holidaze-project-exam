import Layout from "../components/layout/Layout";
import {
  Container,
  Carousel,
  Button,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../components/settings/api";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Your first name must be at least 3 characters"),

  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),

  checkin: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("Please select a date"),
  checkout: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("Please select a date"),
});

export default function HotelDetails() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const [success, setSuccess] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const { id } = useParams();
  const detailUrl = baseUrl + "api/hotels/" + id;
  const bookingUrl = baseUrl + "api/booking";
  let navigate = useNavigate();

  if (!id) {
    navigate("/");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(detailUrl);
        const hotel = response.data.data;
        setDetail(hotel);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(input) {
    console.log(input);

    try {
      const response = await axios.post(bookingUrl, {
        data: {
          hotel: detail.attributes.name,
          name: input.name,
          email: input.email,
          price: detail.attributes.price,
          checkin: input.checkin,
          checkout: input.checkout,
        },
      });
      console.log(response);
      //setSuccess("Thank you for your booking confirmation");
    } catch (error) {
      console.log(error);
      setLoginError(error.toString());
    } finally {
      console.log("finally");
    }
  }

  if (loading) {
    return (
      <Spinner animation="grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
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
          <h1 className="">{detail.attributes.name}</h1>

          <p>
            <i className="fa-solid fa-location-dot me-2"></i>
            {detail.attributes.location}
          </p>
          <h4 className="">Facilities</h4>
          <p className="my-4">
            <i className="fa-solid fa-bed fa-lg mx-5"></i>
            <i className="fa-solid fa-hotel fa-lg mx-5"></i>
            <i className="fa-solid fa-map-location-dot fa-lg mx-5"></i>
            <i className="fa-solid fa-ban-smoking fa-lg mx-5"></i>
          </p>
          <h4 className="">Description</h4>
          <p className="">{detail.attributes.description}</p>
          <h5 className="">{detail.attributes.price} Nok / Night</h5>
          <Button className="btn-lg" onClick={handleShow}>
            Book Now
          </Button>
        </div>

        <div className="modal-container">
          <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit(onSubmit)} className="modal-container">
              <Modal.Header closeButton>
                <Modal.Title>Your Booking</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {success && <h5 className="success">{success}</h5>}

                <h4>{detail.attributes.name}</h4>

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

                <Form.Group className="mb-3" controlId="date">
                  <Form.Label>Check in / Check out</Form.Label>
                  <Form.Control type="date" {...register("checkin")} />
                  {errors.checkin && (
                    <Form.Text className="error">
                      {errors.checkin.message}
                    </Form.Text>
                  )}
                  <Form.Control type="date" {...register("checkout")} />
                  {errors.checkout && (
                    <Form.Text className="error">
                      {errors.checkout.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <h5>{detail.attributes.price} Nok / night</h5>
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
