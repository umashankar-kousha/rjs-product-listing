import React from "react";
import CartItem from "./CartItem";

/* import { cartData } from "../data/productsData"; */
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

const Cart = () => {
  /*  const subTotal = cartData.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  ); */

  return (
    <CartContext.Consumer>
      {(value) => {
        const { cartData } = value;

        return (
          <>
            <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl  items-center">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 w-full md:w-3/4 lg:w-1/2 ">
                <div className="flex items-start justify-between">
                  <h2
                    id="drawer-title"
                    className="text-lg font-medium text-gray-900"
                  >
                    Shopping cart
                  </h2>
                  <div className="ml-3 flex h-7 items-center"></div>
                </div>
                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {cartData.map((item) => (
                        <CartItem {...item} key={item.id} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6 w-full md:w-3/4 lg:w-1/2 ">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  {/*  <p>${subTotal.toFixed(2)}</p> */}
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <a
                    href="#"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                  >
                    Checkout
                  </a>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to={"/"}>
                      <button
                        type="button"
                        command="close"
                        commandfor="drawer"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> →</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      }}
    </CartContext.Consumer>
  );
};

export default Cart;
