import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

const CartItem = (props) => {
  const { title, price, quantity, image, id } = props;
  const [productuantity, setQuantity] = useState(quantity);

  const onAddQuantity = () => {
    setQuantity((prev) => ++prev);
  };

  const onRemoveQuantity = () => {
    setQuantity((prev) => {
      if (prev !== 1) {
        return --prev;
      } else {
        setQuantity(1);
      }
    });
  };

  return (
    <CartContext.Consumer>
      {(value) => {
        const { removeCartItems } = value;
        const onClickOnRemove = () => {
          removeCartItems(id);
        };
        return (
          <>
            <li className="flex py-6 shadow-xl">
              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={image}
                  alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                  className=""
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <Link to={`/product/${id}`}>
                      <h3 className="hover:cursor-pointer hover:text-blue-400">
                        {title}
                      </h3>
                    </Link>
                    <p className="ml-4">${price * quantity}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div>
                    <button
                      className=" mr-2 bg-gray-200 text-black w-9 rounded-full font-bold hover:cursor-pointer"
                      onClick={onAddQuantity}
                    >
                      +
                    </button>
                    <span>{productuantity}</span>
                    <button
                      className=" ml-2 bg-gray-200 text-black w-9 rounded-full font-bold hover:cursor-pointer"
                      onClick={onRemoveQuantity}
                    >
                      -
                    </button>
                  </div>

                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500 outline:none hover:cursor-pointer"
                      onClick={onClickOnRemove}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </>
        );
      }}
    </CartContext.Consumer>
  );
};

export default CartItem;
