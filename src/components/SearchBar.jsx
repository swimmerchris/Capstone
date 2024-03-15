import { useState } from "react";
import React from "react";
import "../index.css";
import { useGetAllProductsQuery } from "../api/api";

export default function SearchBar({
  setFoundProduct,
  foundProduct,
  data,
  setSearchProducts,
  filterProducts,
}) {
  const [searchName, setSearchName] = useState("");
  //   const { data = {}, error, isLoading } = useGetAllProductsQuery();

  //   if (!foundProduct) {
  //     foundProduct = data;
  //   }

  function handleSubmit(event) {
    event.preventDefault();

    if (searchName == "" && filterProducts.length === 0) {
      console.log("here search0");
      setFoundProduct(data);
      setSearchProducts([]);
      return;
    } else if (searchName == "" && filterProducts.length > 0) {
      console.log("here search0 filter");
      setFoundProduct(filterProducts);
      setSearchProducts([]);
    } else if (filterProducts.length > 0) {
      console.log("here search & filter");
      const products = filterProducts.filter((currentProduct) => {
        return currentProduct.title
          .toLowerCase()
          .includes(searchName.toLowerCase());
      });
      setSearchProducts(products);
      setFoundProduct(products);
    } else {
      console.log("here search & no filter");
      const products = data.filter((currentProduct) => {
        return currentProduct.title
          .toLowerCase()
          .includes(searchName.toLowerCase());
      });
      setSearchProducts(products);
      setFoundProduct(products);
    }
  }
  return (
    <div id="search-bar">
      <form onSubmit={handleSubmit}>
        <label>
          Search for Product:{" "}
          <input
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </label>
        <button>search</button>
      </form>
    </div>
  );
}
