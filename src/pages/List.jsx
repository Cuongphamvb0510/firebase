import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useFirebase } from "../context/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const ListingPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate("/login");
    }
  }, [firebase, navigate]);

  const handleresetForm = () => {
    setName("");
    setIsbnNumber("");
    setPrice("");
    setCoverPic(null);
    setResetKey((prevKey) => prevKey + 1);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await firebase
      .handleCreateNewListing(name, isbnNumber, price, coverPic)
      .then((res) => {
        setLoading(false);
        handleresetForm();
        toast("Thành  công", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {});
  };

  return (
    <div className="container mt-5">
      {loading && <Loading />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Book name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
            type="text"
            placeholder="ISBN Number"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Enter Price"
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          key={resetKey}
        >
          <Form.Label>Cover Pic</Form.Label>
          <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])}
            type="file"
          />
        </Form.Group>
        <ToastContainer />

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default ListingPage;
