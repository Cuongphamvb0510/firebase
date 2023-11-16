import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useFirebase } from "../context/Firebase";

const BookCard = (props) => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [url, setURL] = useState(null);

  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setURL(url));
  }, [firebase, props.imageURL]);

  return (
    <Card style={{ width: "18rem", margin: "25px" }}>
      <Card.Img
        variant="top"
        src={
          url ??
          "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        }
      />

      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          Cuốn sách này có tựa đề {props.name} và cuốn sách này do{" "}
          {props.displayName} bán và giá cuốn sách này là {props.price}đ
        </Card.Text>
        <Button onClick={(e) => navigate(props.link)} variant="primary">
          xem chi tiết
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
