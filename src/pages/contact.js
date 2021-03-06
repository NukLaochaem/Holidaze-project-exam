import Layout from "../components/layout/Layout";
import { Form, Button, Container, Accordion } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
    .trim()
    .required("The subject field is required")
    .min(5, "Subject must be at least 5 characters"),

  message: yup
    .string()
    .trim()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"),
});

export default function Contact() {
  const [formError, setformError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    reset();
    try {
      const response = await axios.post(contactUrl, {
        data: {
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      });
      console.log(response);
      setformError(null);
      setSuccess("Your message has been sent!");
    } catch (error) {
      console.log(error);
      setformError("Error! Something went wrong, try again later");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Layout>
      <Container className="accordion-container my-5">
        <h1 className="my-4 text-center">Contact page</h1>
        <Accordion>
          <h2 className="h5 ms-1">Frequently Asked Questions</h2>
          <Accordion.Item eventKey="0">
            <Accordion.Header>CHANGE OR CANCEL A RESERVATION</Accordion.Header>
            <Accordion.Body>
              <p>
                Some bookings can be cancelled or change in the app from the
                "Booking details" page. If the Cancel button is not available
                then please contact Customer Services if you believe that your
                booking is cancellable.
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
                You can reserve parking spaces at some hotels. If you wish to
                reserve a space, please contact the hotel reception or as an
                add-on once you have made your booking.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              WHAT RULES ARE THERE FOR GUIDE DOGS?
            </Accordion.Header>
            <Accordion.Body>
              <p>
                You are more than welcome to bring your guide dog to stay with
                you in your room. You will not be charged to have your guide dog
                staying with you in your room.
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>

      <Container className="form-container py-4 px-5 my-5">
        <Form onSubmit={handleSubmit(onSubmit)} className="my-4">
          {formError && <h5 className="error text-center">{formError} </h5>}
          {success && (
            <h5 className="contact-success text-center">{success} </h5>
          )}
          <fieldset disabled={submitting}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control placeholder="Enter email" {...register("email")} />
              {errors.email && (
                <Form.Text className="error">{errors.email.message}</Form.Text>
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
            <Button type="submit" className="contact-btn mt-2">
              {submitting ? "Sending . . ." : "Send"}
            </Button>
          </fieldset>
        </Form>
      </Container>
    </Layout>
  );
}
