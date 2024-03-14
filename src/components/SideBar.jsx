import { useState } from "react";
import React from "react";
import "../index.css";
import { useGetAllCategoriesQuery, useGetAllProductsQuery } from "../api/api";

export default function SearchBar({ setFoundProduct }) {
  const [filterArray, setFilterArray] = useState([]);

  const { data, error, isLoading } = useGetAllCategoriesQuery();
  const { data: products, error2, isLoading2 } = useGetAllProductsQuery();

  function handleSubmit(event) {
    event.preventDefault();

    if (filterArray.length === 0) {
      setFoundProduct("");
    } else {
      const foundProducts = filterArray.map((category) => {
        return products.filter((currentProduct) => {
          return currentProduct.category === category;
        });
      });

      setFoundProduct(foundProducts.flat(1));
    }
  }

  function handleChange(event) {
    const found = filterArray.find((cat) => cat === event.target.id);
    if (found) {
      const newFilterArray = filterArray.filter(
        (crCat) => crCat !== event.target.id
      );
      setFilterArray(newFilterArray);
    } else {
      filterArray.push(event.target.id);
    }
  }

  if (isLoading || isLoading2) {
    return <p>Loading...</p>;
  }
  if (error || isLoading2) {
    return <div>Error Occurred</div>;
  }

  //   console.log(filterArray);

  return (
    <div id="side-bar">
      <form onSubmit={handleSubmit}>
        {data &&
          data.map((catergory, i) => {
            return (
              <div key={i}>
                <label id={catergory}>
                  <input
                    type="checkbox"
                    id={catergory}
                    value={false}
                    onChange={handleChange}
                  />
                  {catergory}
                </label>
              </div>
            );
          })}
        <button>filter</button>
      </form>
    </div>
  );
}
