import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductsListing = (props) => {
  let { products } = props;

  const [searchValue, setSearchValue] = useState("");

  const [filterBy, setFilter] = useState("all");
  const [sortBy, setSorting] = useState("none");

  function getFilteredProducts(list) {
    if (filterBy !== "all") {
      list = list.filter((item) => {
        return item.category === filterBy;
      });
    }
    return list;
  }

  function getFinalData() {
    let list = products;

    list = getFilteredProducts(list);
    list = getSortedList(list);
    list = getSearchItems(list);

    return list;
  }

  const filteredData = getFinalData();

  function getSortedList(list) {
    switch (sortBy) {
      case "price":
        list.sort((item1, item2) => {
          return item1.price - item2.price;
        });
        break;
      case "rating":
        list.sort((item1, item2) => {
          return item2.rating.rate - item1.rating.rate;
        });
        break;
      case "title":
        list.sort((item1, item2) => {
          return item1.title.localeCompare(item2.title);
        });
        break;
      case "none":
        return list;

        break;
    }
    return list;
  }

  function getSearchItems(list) {
    if (searchValue !== "")
      list = list.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
      );

    return list;
  }
  const handleSorting = (e) => {
    setSorting(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const clearFilters = () => {
    setSorting("none");
    setFilter("all");
    setSearchValue("");
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className=" flex justify-center items-center sm:flex-row  sm:justify-around  flex-col flex-wrap m-3">
          <div>
            <div className="w-70 mb-3">
              <label htmlFor="filterBy" className="mt-3">
                Filter By :
              </label>
              <select
                name="filter"
                id="filterBy"
                className="w-50 outline-none"
                onChange={handleFilter}
                value={filterBy}
              >
                <option value="all">ALL</option>
                <option value="men's clothing">Men's clothing</option>
                <option value="jewelery">Jewelery</option>
                <option value="electronics">Electronics</option>
                <option value="women's clothing">Women's clothing</option>
              </select>
            </div>
            <div className="w-70 mb-3">
              <label htmlFor="sortBy" className="mr-3">
                Sort By :
              </label>
              <select
                name="sort"
                id="sortBy"
                className="w-50 outline-none"
                onChange={handleSorting}
                value={sortBy}
              >
                <option value="none">None</option>
                <option value="price">Price</option>

                <option value="title">Name</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
          <input
            type="search"
            placeholder="Search"
            className="bg-gray-200 p-3 w-70 outline-none"
            value={searchValue}
            onChange={handleSearch}
          />
          <button
            className="rounded-sm p-2 mt-3 sm:mt-0 hover:cursor-pointer hover:bg-sky-500/100 bg-blue-500 text-white font-medium"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          All Products
        </h2>
        <div className="mt-6 flex flex-row flex-wrap justify-around items-center">
          {filteredData.map((product, index) => {
            return <ProductCard {...product} key={product.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductsListing;
