import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { baseUrl } from "../settings/api";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AddHotelUrl = baseUrl + "api/hotels";

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  location: yup.string().required("Please enter your username"),
  price: yup.string().required("Please enter your password"),
  detail: yup.string().required("Please enter your password"),
  image: yup.string().required("Please enter your password"),
});

export default function AddHotel(input) {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit() {
    try {
      const { data } = await axios.post(AddHotelUrl, {
        name: input.name,
        location: input.location,
        price: input.price,
        detail: input.detail,
        image: "",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  onSubmit();

  return (
    <Container className="add-container bg-white my-5 p-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Add now hotels</h2>

        <fieldset disabled={submitting}>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              type="email"
              placeholder="Hotel name"
              {...register("hotelname")}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="location"
            {...register("location")}
          >
            <Form.Label></Form.Label>
            <Form.Control type="text" placeholder="Location" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price" {...register("price")}>
            <Form.Label></Form.Label>
            <Form.Control type="number" placeholder="Price" />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="details"
            {...register("detail")}
          >
            <Form.Label></Form.Label>
            <Form.Control type="text" placeholder="Details" />
          </Form.Group>

          <Form.Group className="mb-3" {...register("image")}>
            <Form.Label className="form-label">Images files</Form.Label>
            <Form.Control
              className="form-control"
              type="file"
              id="formFileMultiple"
              multiple
            />
          </Form.Group>
        </fieldset>

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
