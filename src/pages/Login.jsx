import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useFirebase } from "../context/Firebase";
import Loading from "../components/Loading";

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogins, setErrorLogins] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    firebase
      .singinUserWithEmailAndPass(email, password)
      .then((userCredential) => {
        setLoading(false);
        const user = userCredential.user;
        console.log("Successfull", user);
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorLogins(errorCode);
      });
  };

  return (
    <div className="container mt-5">
      {errorLogins !== "" && (
        <div style={{ color: "red" }}>THÔNG TIN ĐĂNG NHẬP KHÔNG HỢP LỆ</div>
      )}
      {loading && <Loading />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <h1 className="mt-5 mb-5">OR</h1>
      <Button onClick={() => navigate("/register")} variant="danger">
        Register
      </Button>
      <Button
        onClick={firebase.signinWithGoogle}
        variant="danger"
        style={{ marginLeft: "20px" }}
      >
        Signin with Google
      </Button>
    </div>
  );
};

export default LoginPage;
