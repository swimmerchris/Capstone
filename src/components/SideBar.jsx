import { useState } from "react";
import React from "react";
import "../index.css";
import { useGetAllCategoriesQuery, useGetAllProductsQuery } from "../api/api";

export default function SideBar({
  setFoundProduct,
  foundProduct,
  setFilterProducts,
  searchProducts,
  data,
  searchName,
}) {
  const [filterArray, setFilterArray] = useState([]);
  const { data: categories, error, isLoading } = useGetAllCategoriesQuery();

  function handleSubmit(event) {
    event.preventDefault();

    if (filterArray.length === 0 && searchProducts.length === 0) {
      console.log("here filter00");
      setFoundProduct(data);
      setFilterProducts([]);
    } else if (filterArray.length === 0 && searchProducts.length > 0) {
      console.log("filter 0 with search products", filterArray, searchProducts);
      setFilterProducts([]);
      const products = data.filter((currentProduct) => {
        return currentProduct.title
          .toLowerCase()
          .includes(searchName.toLowerCase());
      });
      setFoundProduct(products);
    } else if (searchProducts.length > 0) {
      console.log("here search >0 with filter");
      const foundProducts = filterArray.map((category) => {
        return searchProducts.filter((currentProduct) => {
          return currentProduct.category === category;
        });
      });
      setFilterProducts(foundProducts.flat(1));
      setFoundProduct(foundProducts.flat(1));
    } else {
      console.log("here nosearch fil");
      const foundProducts = filterArray.map((category) => {
        return data.filter((currentProduct) => {
          return currentProduct.category === category;
        });
      });
      setFilterProducts(foundProducts.flat(1));
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

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <div>Error Occurred</div>;
  }

  //   console.log(filterArray);

  return (
    <div id="side-bar">
      <form onSubmit={handleSubmit}>
        {categories &&
          categories.map((catergory, i) => {
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
