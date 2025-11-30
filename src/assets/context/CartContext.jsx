import React from "react";

const CartContext = React.createContext({
  cartData: [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      quantity: 1,
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      rating: { rate: 3.9, count: 120 },
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      quantity: 1,
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
      rating: { rate: 4.1, count: 259 },
    },
  ],
  addCartItems: () => {},
  removeCartItems: () => {},
  inCreaseQuantity: () => {},
  decreaseQuantity: () => {},
});

export default CartContext;
