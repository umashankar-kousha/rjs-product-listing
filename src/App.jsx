import "./App.css";

import ProductsListing from "./assets/components/ProductsListing";
import products from "./assets/data/productsData";
import Navbar from "./assets/components/Navbar";
import DetailedProduct from "./assets/components/DetailedProduct";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Cart from "./assets/components/Cart";
import NotFound from "./assets/components/NotFound";
import CartContext from "./assets/context/CartContext";
import CartItem from "./assets/components/CartItem";
import { useState } from "react";

const App = () => {
  const [cartData, updateCartData] = useState([
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      quantity: 1,
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
      rating: { rate: 4.7, count: 500 },
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      quantity: 1,
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
      rating: { rate: 2.1, count: 430 },
    },
  ]);

  const addCartItems = (data) => {
    updateCartData((prev) => [...prev, data]);
    alert("Added to Cart");
  };

  return (
    <Router>
      <CartContext.Provider
        value={{
          cartData: cartData,
          addCartItems: addCartItems,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" Component={ProductsListing} />
          <Route path="/product/:id" Component={DetailedProduct} />
          <Route path="/cart" Component={Cart} />
          <Route path="/not-found" Component={NotFound} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </CartContext.Provider>
    </Router>
  );
};

export default App;
