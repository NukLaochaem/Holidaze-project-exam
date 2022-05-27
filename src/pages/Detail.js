import Layout from "../components/layout/Layout";
import { Container, Button, Modal, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
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
    .trim()
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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const detailUrl = baseUrl + "api/hotels/" + id + "?populate=image";
  const bookingUrl = baseUrl + "api/bookings";
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  async function onSubmit(input) {
    setSubmitting(true);
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
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      navigate("/confirmed");
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(detailUrl);
        const hotel = response.data.data;
        setDetail(hotel);
        console.log(hotel);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-5">
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="p-0">
        <div className="detail-container">
          {detail.attributes.image.data.map(function (img) {
            return (
              <div className="hotel-detail-img" key={detail.id}>
                <img
                  src={img.attributes.formats.medium.url}
                  alt={detail.attributes.name}
                  className="img-fluid"
                />
              </div>
            );
          })}

          <div className="hotel-detail-container mb-5 p-4">
            <h1>{detail.attributes.name}</h1>
            <p>
              <i className="fa-solid fa-location-dot me-2 my-2"></i>
              {detail.attributes.location}
            </p>
            <h4 className="">Facilities</h4>
            <p className="my-4">
              <i className="fa-solid fa-bed fa-lg mx-4"></i>
              <i className="fa-solid fa-hotel fa-lg mx-4"></i>
              <i className="fa-solid fa-map-location-dot fa-lg mx-4"></i>
              <i className="fa-solid fa-ban-smoking fa-lg mx-4"></i>
            </p>
            <h4 className="">Description</h4>
            <p className="">{detail.attributes.description}</p>
            <div className="d-flex align-items-center justify-content-end ">
              <h5 className="me-3">{detail.attributes.price} Nok / Night</h5>
              <Button className="btn-lg me-md-3" onClick={handleShow}>
                Book Now
              </Button>
            </div>
          </div>
        </div>

        <div className="modal-container">
          <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit(onSubmit)} className="modal-container">
              <Modal.Header closeButton>
                <Modal.Title>Your Booking</Modal.Title>
              </Modal.Header>

              <Modal.Body>
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
                  <Form.Label>Check in</Form.Label>
                  <Form.Control type="date" {...register("checkin")} />
                  {errors.checkin && (
                    <Form.Text className="error">
                      {errors.checkin.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="date">
                  <Form.Label>Check out</Form.Label>
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
                  {submitting ? "Booking. . ." : "Book"}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </Container>
    </Layout>
  );
}
