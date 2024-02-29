import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../api/api";
import SearchBar from "./SearchBar";

export default function Products() {
  const { data = {}, error, isLoading } = useGetAllProductsQuery();
  const [foundProduct, setFoundProduct] = useState(null);
  const navigate = useNavigate();
  if (isLoading) {
    return <div>is Loading...</div>;
  }

  // Show an error message if the fetch failed
  if (error) {
    return <div>Error Occurred</div>;
  }

  return (
    <div className="Product-page">
      <SearchBar
        foundProduct={foundProduct}
        setFoundProduct={setFoundProduct}
      />
      <div className="Product-container">
        {foundProduct
          ? foundProduct.map((product) => (
              <div key={product.id} className="Product-card">
                <div className="Product-card-container">
                  <h2> {product.title} </h2>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="Product-image-card"
                  />
                  <div>Price: {product.price}</div>
                  <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="Product-button"
                  >
                    <span>Product Details </span>
                  </button>
                </div>
              </div>
            ))
          : data.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-card-container">
                  <h2> {product.title} </h2>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image-card"
                  />
                  <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="product-button"
                  >
                    <span>Product Details </span>
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
