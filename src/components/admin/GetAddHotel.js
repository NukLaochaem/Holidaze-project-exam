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
  hotelname: yup.string().trim().required("Enter Hotel name"),
  location: yup.string().trim().required("Enter Hotel location"),
  price: yup.number("Price must be a number").required("Enter Hotel price"),
  description: yup.string().trim().required("Enter Hotel description"),
  image: yup.mixed().required("image required"),
});

export default function AddHotel() {
  const [submitting, setSubmitting] = useState(false);
  const [Error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const authToken = GetToken();
  const token = authToken.jwt;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
    <Container className="add-container bg-white my-5 p-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        {success && <h5 className="addHotel-success text-center">{success}</h5>}
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
              <Form.Text className="error">{errors.location.message}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-4">
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
              <Form.Text className="error">{errors.image.message}</Form.Text>
            )}
          </Form.Group>
        </fieldset>
        <Button type="submit">
          {submitting ? "Processing . . ." : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}
