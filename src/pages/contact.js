import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//import axios from "axios";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your first name")
    .min(3, "Your first name must be at least 3 characters"),

  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),

  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"),
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log(data);

    /*try {
      const response = await axios.post(data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      //setLoginError(error.toString());
    } finally {
      //setSubmitting(false);
    }*/
  }
  return (
    <Container>
      <h1 className="my-2">Contact page</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your Name</Form.Label>
          <Form.Control placeholder="First name" {...register("name")} />
          {errors.name && (
            <Form.Text className="error">{errors.name.message}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control placeholder="Enter email" {...register("email")} />
          {errors.email && (
            <Form.Text className="error">{errors.email.message}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={4} {...register("message")} />
          {errors.message && (
            <Form.Text className="error">{errors.message.message}</Form.Text>
          )}
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
