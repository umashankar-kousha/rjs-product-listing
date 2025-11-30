import React from "react";

const CartContext = React.createContext({
  cartData: [],
  addCartItems: () => {},
  removeCartItems: () => {},
  updateQuantity: () => {},
});

export default CartContext;
