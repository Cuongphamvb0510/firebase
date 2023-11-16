import React, { useEffect, useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";

import BookCard from "../components/Card";
import { useFirebase } from "../context/Firebase";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [books, setBooks] = useState([]);

  console.log(firebase.isLoggedIn);

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate("/login");
    }
  }, [firebase, navigate]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => {
      setBooks(books.docs);
      setLoading(false);
    });
  }, [firebase]);

  return (
    <div className="container mt-5">
      <CardGroup>
        {loading && <Loading />}
        {books.map((book) => (
          <BookCard
            link={`/book/view/${book.id}`}
            key={book.id}
            id={book.id}
            {...book.data()}
          />
        ))}
      </CardGroup>
    </div>
  );
};

export default HomePage;
