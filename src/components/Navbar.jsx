import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, useFirebase } from "../context/Firebase";
import { signOut } from "firebase/auth";

const MyNavbar = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const handleLogout = () => {
    signOut(firebaseAuth)
      .then(() => {
        navigate("/login");
        firebase.setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        {/* <Navbar.Brand href="/">Navbar</Navbar.Brand> */}
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/book/list">Add Listing</Nav.Link>
          <Nav.Link href="/book/orders">Orders</Nav.Link>
          <Nav.Link href="/chat">Chats</Nav.Link>
        </Nav>
        <div>
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
