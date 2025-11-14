import React from "react";

const ProductCard = (props) => {
  let { title, image, price, rating } = props;
  return (
    <div>
      <div className=" flex justify-between flex-col group relative shadow-md p-3 rounded-md h-full">
        <img
          src={image}
          alt="Front of men's Basic Tee in dark gray"
          className="aspect-square w-full rounded-md "
        />
        <div className="mt-4 flex flex-col justify-between">
          <h3 className="text-sm text-gray-800">{title}</h3>
          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-900">$ {price}</p>
            <p className="mt-1 text-sm text-gray-500">Rating : {rating.rate}</p>
          </div>
        </div>
        <button className="w-5/6 ml-auto mr-auto bg-blue-500 hover:bg-blue-600 hover:cursor-pointer rounded-md p-1 mt-2 text-white">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
