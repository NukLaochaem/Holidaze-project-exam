import { Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { baseUrl } from "../settings/api";
import axios from "axios";

const AddHotelUrl = baseUrl + "api/hotels";

export default function AddHotel() {
  const [submitting, setSubmitting] = useState(false);

  useEffect(function () {
    async function add() {
      try {
        const response = await axios.post(AddHotelUrl);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    add();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="add-container bg-white my-5 p-5">
      <Form className="">
        <h2>Add now hotels</h2>

        <Form.Group className="mb-3">
          <Form.Label></Form.Label>
          <Form.Control type="email" placeholder="Hotel name" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="location">
          <Form.Label></Form.Label>
          <Form.Control type="text" placeholder="Location" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label></Form.Label>
          <Form.Control type="number" placeholder="Price" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="details">
          <Form.Label></Form.Label>
          <Form.Control type="text" placeholder="Details" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form-label">Images files</Form.Label>
          <Form.Control
            className="form-control"
            type="file"
            id="formFileMultiple"
            multiple
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
