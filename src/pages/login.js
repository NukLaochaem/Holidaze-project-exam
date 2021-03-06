import Layout from "../components/layout/Layout";
import { Form, Button, Container } from "react-bootstrap";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../components/settings/api";
import AuthContext from "../auth/AuthContex";

const LoginUrl = baseUrl + "api/auth/local";

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

  const [, setAuth] = useContext(AuthContext);

  async function onSubmit(input) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const { data } = await axios.post(LoginUrl, {
        identifier: input.username,
        password: input.password,
      });

      if (data.user) {
        setAuth(data);
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
      setLoginError("Error! Something went wrong, try again later");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <Container className="login-container p-4 p-lg-5 my-5">
        <h1 className="login-header text-center">Admin Login page</h1>

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
              {submitting ? "Loggin in. . ." : "Login"}
            </Button>
          </fieldset>
        </Form>
      </Container>
    </Layout>
  );
}
