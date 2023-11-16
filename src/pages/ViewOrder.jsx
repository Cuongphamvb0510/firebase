import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      firebase
        .fetchMyBooks(firebase.user.uid)
        ?.then((books) => {
          setLoading(false);
          setBooks(books.docs);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [firebase]);

  console.log(books);
  if (!firebase.isLoggedIn)
    return (
      <div>
        <h1>Can dang nhap</h1>
        <button onClick={() => navigate("/login")}>dang nhap</button>
      </div>
    );

  return (
    <div>
      {loading && <Loading />}
      {books.length === 0 && <h1>No Data</h1>}
      {books.map((book) => (
        <BookCard
          link={`/books/orders/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
  );
};

export default OrdersPage;
