import { Routes, Route, useNavigate } from "react-router-dom";

// Components
import MyNavbar from "./components/Navbar";

// Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/Detail";
import OrdersPage from "./pages/ViewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetail";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Chat from "./pages/Chat";
import { useEffect } from "react";
import { useFirebase } from "./context/Firebase";

function App() {
  // const signuoUser = () => {
  //   createUserWithEmailAndPassword(
  //     firebaseAuth,
  //     "cuongpham@gmail.com",
  //     "cuongvip123"
  //   ).then((user) => {
  //     console.log(user);
  //   });
  // };
  return (
    <div>
      {/* <button onClick={signuoUser}>create</button> */}
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/list" element={<ListingPage />} />
        <Route path="/book/view/:bookId" element={<BookDetailPage />} />
        <Route path="/book/orders" element={<OrdersPage />} />
        <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
