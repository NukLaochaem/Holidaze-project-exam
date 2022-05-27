import { Container, Form, Button, Accordion, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../auth/AuthContex";
import Layout from "../components/layout/Layout";
//import GetContact from "../components/admin/GetContact";
//import GetBooking from "../components/admin/GetBooking";
//import GetAddHotel from "../components/admin/GetAddHotel";
import { baseUrl } from "../components/settings/api";

import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GetToken } from "../components/admin/GetToken";

const AddHotelUrl = baseUrl + "api/hotels";
const contactUrl = baseUrl + "api/contacts";
const bookingUrl = baseUrl + "api/bookings";

const schema = yup.object().shape({
  hotelname: yup.string().trim().required("Enter Hotel name"),
  location: yup.string().trim().required("Enter Hotel location"),
  price: yup.number("Price must be a number").required("Enter Hotel price"),
  description: yup.string().trim().required("Enter Hotel description"),
  image: yup.mixed().required("image required"),
});

export default function Admin() {
  const [auth, setAuth] = useContext(AuthContext);

  const [submitting, setSubmitting] = useState(false);
  const [Error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [contact, setContact] = useState([]);

  const [bookings, setBookings] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let navigate = useNavigate();
  const authToken = GetToken();
  const token = authToken.jwt;
  function logout() {
    setAuth(null);
    navigate("/login");
  }

  useEffect(function () {
    async function contactAdmin() {
      try {
        const response = await axios.get(contactUrl);

        setContact(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    contactAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(function () {
    async function Booking() {
      try {
        const response = await axios.get(bookingUrl);

        setBookings(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    Booking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(input) {
    setSubmitting(true);

    const formData = new FormData();
    const data = {
      name: input.hotelname,
      location: input.location,
      price: input.price,
      description: input.description,
    };
    console.log(data);
    const file = input.image[0];

    formData.append("files.image", file, file.name);
    formData.append("data", JSON.stringify(data));

    reset();

    try {
      const response = await axios({
        url: AddHotelUrl,
        method: "POST",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setSuccess("Hotel has been added");
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Error! Something went wrong, try again later");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Layout>
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="my-3">Admin page</h1>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>

        <Container className="booking-container bg-white p-3 p-md-5 my-5">
          <h2>Booking</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Hotel name</th>
                <th>Check in </th>
                <th>Check out</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                return (
                  <tr key={booking.id}>
                    <td>{booking.attributes.name}</td>
                    <td>{booking.attributes.hotel}</td>
                    <td>{booking.attributes.checkin}</td>
                    <td>{booking.attributes.checkout}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>

        <Container className="message-container bg-white p-5">
          <div className="message-admin">
            <h2>Messages</h2>
            <Accordion defaultActiveKey={["0"]}>
              {contact.map((contact) => {
                return (
                  <Accordion.Item eventKey={contact.id} key={contact.id}>
                    <Accordion.Header>
                      <h5>{contact.attributes.subject}</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>
                        <span className="me-2">From:</span>
                        {contact.attributes.email}
                      </p>
                      Message: {contact.attributes.message}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </div>
        </Container>

        <Container className="add-container bg-white my-5 p-5">
          <Form onSubmit={handleSubmit(onSubmit)}>
            {success && (
              <h5 className="addHotel-success text-center">{success}</h5>
            )}
            {Error && <h5 className="error text-center">{Error} </h5>}
            <h2 className="mb-3">Add new hotel </h2>

            <fieldset disabled={submitting}>
              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="Hotel name"
                  {...register("hotelname")}
                />
                {errors.hotelname && (
                  <Form.Text className="error">
                    {errors.hotelname.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="Location"
                  {...register("location")}
                />
                {errors.location && (
                  <Form.Text className="error">
                    {errors.location.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  type="number"
                  placeholder="Price"
                  {...register("price")}
                />
                {errors.price && (
                  <Form.Text className="error">
                    {errors.price.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="description"
                  {...register("description")}
                />
                {errors.description && (
                  <Form.Text className="error">
                    {errors.description.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label></Form.Label>
                <Form.Control
                  className="form-control"
                  type="file"
                  {...register("image")}
                />

                {errors.image && (
                  <Form.Text className="error">
                    {errors.image.message}
                  </Form.Text>
                )}
              </Form.Group>
            </fieldset>
            <Button type="submit">
              {submitting ? "Processing . . ." : "Submit"}
            </Button>
          </Form>
        </Container>
      </Container>
    </Layout>
  );
}
