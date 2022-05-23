import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { baseUrl } from "../settings/api";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getToken } from "./getToken";

const AddHotelUrl = baseUrl + "api/hotels";

const schema = yup.object().shape({
  hotelname: yup.string().required("Enter hotel name"),
  location: yup.string().required("Enter hotel location"),
  price: yup.string().required("Enter hotel price"),
  detail: yup.string().required("Enter Hotel detail"),
  image: yup.object().required("Image required"),
});

export default function AddHotel(input) {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setformError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit() {
    const authToken = getToken();
    const token = authToken.jwt;

    try {
      const { data } = axios.post(
        AddHotelUrl,
        {
          name: input.name,
          location: input.location,
          price: input.price,
          detail: input.detail,
          image: input.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  onSubmit();

  return (
    <Container className="add-container bg-white my-5 p-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-3">Add new hotel</h2>

        <fieldset disabled={submitting}>
          <Form.Group className="mb-3">
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
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="location"
            {...register("location")}
          >
            <Form.Control type="text" placeholder="Location" />
            {errors.location && (
              <Form.Text className="error">{errors.location.message}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="price" {...register("price")}>
            <Form.Control type="number" placeholder="Price" />
            {errors.price && (
              <Form.Text className="error">{errors.price.message}</Form.Text>
            )}
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="details"
            {...register("detail")}
          >
            <Form.Control type="text" placeholder="Details" />
            {errors.detail && (
              <Form.Text className="error">{errors.detail.message}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" {...register("image")}>
            <Form.Control
              className="form-control"
              type="file"
              id="formFileMultiple"
              multiple
            />
            {errors.image && (
              <Form.Text className="error">{errors.image.message}</Form.Text>
            )}
          </Form.Group>
        </fieldset>

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
