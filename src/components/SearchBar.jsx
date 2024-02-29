import { useState } from "react";
import React from "react";
import "../index.css";
import { useGetAllProductsQuery } from "../api/api";

export default function SearchBar({ setFoundProduct }) {
  const [searchName, setSearchName] = useState("");
  const { data = {}, error, isLoading } = useGetAllProductsQuery();

  function handleSubmit(event) {
    event.preventDefault();

    const player = data.filter((currentProduct) => {
      return currentProduct.title
        .toLowerCase()
        .includes(searchName.toLowerCase());
    });
    setFoundProduct(player);
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
