import React from "react";
import { useNavigate } from "react-router-dom";

const ListDetails = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div>
      {data?.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-card-container">
            <h2> {product.title} </h2>
            <img
              src={product.image}
              alt={product.title}
              className="product-image-card"
            />
            <div>Price: {product.price}</div>
            <div>Customer Rating: {product.rating.rate}</div>
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
  );
};

export default ListDetails;
