// This Component handles the search functionality
import React from "react";
import "../index.css";

export default function SearchBar({
  setFoundProduct,
  foundProduct,
  data,
  setSearchProducts,
  filterProducts,
  searchName,
  setSearchName,
}) {
  //This function handles the submission for the search bar and filters products based on search
  function handleSubmit(event) {
    event.preventDefault();

    if (searchName == "" && filterProducts.length === 0) {
      setFoundProduct(data);
      setSearchProducts([]);
      return;
    } else if (searchName == "" && filterProducts.length > 0) {
      setFoundProduct(filterProducts);
      setSearchProducts([]);
    } else if (filterProducts.length > 0) {
      const products = filterProducts.filter((currentProduct) => {
        return currentProduct.title
          .toLowerCase()
          .includes(searchName.toLowerCase());
      });
      setSearchProducts(products);
      setFoundProduct(products);
    } else {
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
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            placeholder="Search for Products"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </label>
        <button>search</button>
      </form>
    </div>
  );
}
