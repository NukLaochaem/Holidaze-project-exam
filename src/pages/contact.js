import Layout from "../components/layout/Layout";
import { Form, Button, Container, Accordion } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//import useAxios from "../hooks/useAxios";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../components/settings/api";

const contactUrl = baseUrl + "api/contacts";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),

  subject: yup
    .string()
    .required("The subject field is reqiored")
    .min(5, "Subject must be at least 5 characters"),

  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"),
});

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  //const [loginSuccess, setLoginSuccess] = useState(null);
  //const http = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log(data);

    try {
      const response = await axios.post(contactUrl, {
        data: {
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      });
      console.log(response);
      setLoginError("Your message has been sent");
      reset(response);
    } catch (error) {
      console.log(error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Layout>
      <div className="contact-background">
        <Container>
          <h1 className="mb-4 text-center">Contact page</h1>
          <div className="accordion-container my-5">
            <Accordion>
              <h2 className="h5 ms-1">Frequently Asked Questions</h2>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  CHANGE OR CANCEL A RESERVATION
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    Some bookings can be cancelled or change in the app from the
                    "Booking details" page. If the Cancel button is not
                    available then please contact Customer Services if you
                    believe that your booking is cancellable.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  WHAT ARE YOUR CHECK-IN/CHECK-OUT TIMES?
                </Accordion.Header>
                <Accordion.Body>
                  <p>- Check-in time: guaranteed from 3pm</p>
                  <p>- Check-out time: before 12 noon</p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>PARKING</Accordion.Header>
                <Accordion.Body>
                  <p>
                    You can reserve parking spaces at some hotels. If you wish
                    to reserve a space, please contact the hotel reception or as
                    an add-on once you have made your booking.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  WHAT RULES ARE THERE FOR GUIDE DOGS?
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    You are more than welcome to bring your guide dog to stay
                    with you in your room. You will not be charged to have your
                    guide dog staying with you in your room.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Container>

        <Container className="form-container py-1 px-4 my-5">
          <Form onSubmit={handleSubmit(onSubmit)} className="my-4">
            {loginError && <h5 className="error">{loginError} </h5>}

            <fieldset disabled={submitting}>
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

              <Form.Group className="mb-3" controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control placeholder="Subject" {...register("subject")} />
                {errors.subject && (
                  <Form.Text className="error">
                    {errors.subject.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} {...register("message")} />
                {errors.message && (
                  <Form.Text className="error">
                    {errors.message.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Button type="submit" className="contact-btn mt-2 btn-lg">
                Submit
              </Button>
            </fieldset>
          </Form>
        </Container>
      </div>
    </Layout>
  );
}
