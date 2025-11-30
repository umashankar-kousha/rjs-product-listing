import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import CartContext from "../context/CartContext";

const DetailedProduct = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const singleProduct = response.data.find((item) => item.id == id);
        setProduct(singleProduct);
        if (!singleProduct) {
          navigate("/not-found", { replace: true });
          return;
        }

        setSimilarProducts(() => {
          return response.data
            .filter(
              (item) =>
                item.category === singleProduct.category &&
                item.id !== singleProduct.id
            )
            .slice(0, 3);
        });
      } catch (e) {
        setError(e.message);
        setProduct({});
        setSimilarProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchedProducts();
  }, [id]);

  if (error) {
    return <div>An error occurred: {error}</div>;
  }

  if (isLoading) {
    return (
      <div className="bg-white w-screen min-h-screen flex flex-col items-center justify-center  p-5 mt-5">
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <CartContext.Consumer>
      {(value) => {
        const { cartData, addCartItems } = value;
        const isItemPresentInCart = cartData.find(
          (item) => item.id === product.id
        )
          ? true
          : false;

        const onAddToCart = () => {
          addCartItems({ ...product, quantity: 1 });
        };
        return (
          <div className="bg-white w-screen min-h-screen flex flex-col items-center  p-5 mt-5">
            <div className="flex  justify-around items-center  flex-wrap shadow-lg max-w-5xl w-5/6">
              <div className="  flex justify-center w-90">
                <img src={product.image} alt="image" className="h-80 w-90" />
              </div>
              <div className="   flex flex-col justify-around p-5 w-90">
                <h1 className="text-2xl text-black font-bold">
                  {product.title}
                </h1>

                <p>{product.description}</p>
                <div className="flex justify-between items-center w-full  mt-5">
                  <div className="flex flex-col mr-5">
                    <span className="text-base font-semibold">Price</span>
                    <span className="text-lg font-bold mt-2">
                      $ {product.price}
                    </span>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-base font-semibold">
                      Overal Rating
                    </span>
                    <div className="mt-2">
                      <span className="text-lg font-bold  text-white bg-green-700 p-1 w-9 text-center  mr-2">
                        {product.rating.rate}
                      </span>
                      <span className="text-xs font-normal ">
                        Based on {product.rating.count} reviews
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center w-full  mt-5">
                  {/* <div className="flex  flex-col justify-center items-start">
                    <span className="text-base font-semibold text-left mb-2">
                      Quantity
                    </span>
                    <div>
                      <button
                        className=" mr-2 bg-gray-200 text-black w-9 rounded-full font-bold hover:cursor-pointer"
                        onClick={onIncreaseQuantity}
                      >
                        +
                      </button>
                      <span>{quantity}</span>
                      <button
                        className=" ml-2 bg-gray-200 text-black w-9 rounded-full font-bold hover:cursor-pointer"
                        onClick={onDecreaseQuantity}
                      >
                        -
                      </button>
                    </div>
                  </div> */}
                  {!isItemPresentInCart && (
                    <button
                      className=" p-3 rounded-lg  font-bold bg-cyan-500 hover:bg-cyan-500/90 hover:cursor-pointer text-white w-3/4"
                      onClick={onAddToCart}
                    >
                      Add to cart
                    </button>
                  )}
                  {isItemPresentInCart && (
                    <Link to={"/cart"} className=" w-3/4">
                      <button className=" p-3 rounded-lg  font-bold bg-cyan-500 hover:bg-cyan-500/90 hover:cursor-pointer text-white w-full">
                        Go to cart
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="w-5/6 mt-5">
              <h1 className="text-2xl text-black font-bold">
                Similar Products
              </h1>
              <div className="flex justify-center items-center flex-wrap">
                {similarProducts.map((product) => {
                  return <ProductCard {...product} key={product.id} />;
                })}
              </div>
            </div>
          </div>
        );
      }}
    </CartContext.Consumer>
  );
};

export default DetailedProduct;
