import Layout from "../components/layout/Layout";
import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "https://holidaze-api-strapi.herokuapp.com/api/auth/local";

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(input) {
    setSubmitting(true);
    setLoginError(null);

    console.log(input);

    try {
      const { data } = await axios.post(url, {
        identifier: input.username,
        password: input.password,
      });

      console.log(data);

      if (data.user) {
        //Save token and user name and rediret to /admin
        navigate("/admin");
      }

      if (data.error) {
        //display error message
      }
    } catch (error) {
      console.log(error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <Container className="login-container p-4">
        <h1 className="login-header py-2 text-center">Admin Login page</h1>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {loginError && <h5 className="error">{loginError}</h5>}
          <fieldset disabled={submitting}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Username"
                type="text"
                {...register("username")}
              />
              {errors.username && (
                <Form.Text className="error">
                  {errors.username.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <Form.Text className="error">
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>

            <Button type="submit" className="my-2">
              {submitting ? "Loggin in..." : "Login"}
            </Button>
          </fieldset>
        </Form>
      </Container>
    </Layout>
  );
}

/*

async function adminUser(username, password) {
  const userData = JSON.stringify({
    identifier: username,
    password: password,
  });

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "/admin.html";
    }
    if (json.error) {
      return displayMessage(
        "form-error",
        "Invalid username/password",
        ".log-ing-container"
      );
    }
  } catch (error) {
    console.log(error);
  }
}
*/

/* 
Login page

contact - display success message

booking - date picker, display success message

admin- msg, booking, add display success

nav - login to logout if token exist

search bar - filter & display
*/