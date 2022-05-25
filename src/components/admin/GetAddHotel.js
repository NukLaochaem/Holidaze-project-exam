import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { baseUrl } from "../settings/api";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GetToken } from "./GetToken";

const AddHotelUrl = baseUrl + "api/hotels";

const schema = yup.object().shape({
  hotelname: yup.string().required("Enter Hotel name"),
  location: yup.string().required("Enter Hotel location"),
  price: yup
    .number("Hotel price must be a number")
    .required("Enter Hotel price"),
  detail: yup.string().required("Enter Hotel detail"),
  image: yup.mixed().required("image required"),
});

export default function AddHotel() {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setformError] = useState(null);

  const authToken = GetToken();
  const token = authToken.jwt;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(input) {
    const formData = new FormData();
    const data = {
      name: input.hotelname,
      location: input.location,
      price: input.price,
      detail: input.detail,
      image: input.image,
    };

    const file = input.image[0];

    formData.append("files.image", file, file.name);
    formData.append("data", JSON.stringify(data));

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await axios({
        url: AddHotelUrl,
        options,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

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
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Location"
              {...register("location")}
            />
            {errors.location && (
              <Form.Text className="error">{errors.location.message}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Price"
              {...register("price")}
            />
            {errors.price && (
              <Form.Text className="error">{errors.price.message}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Details"
              {...register("detail")}
            />
            {errors.detail && (
              <Form.Text className="error">{errors.detail.message}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image file-szie should be less then 200KB</Form.Label>
            <Form.Control
              className="form-control"
              type="file"
              {...register("image")}
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
