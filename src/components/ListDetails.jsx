import React from "react";
import { useNavigate } from "react-router-dom";

const ListDetails = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="container_products">
      {data?.map((product) => (
        <div className="product-card-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-image-card"
          />
          <div className="middle_container">
            <h2> {product.title} </h2>
            <div>Price: ${product.price}</div>
            <div>Customer Rating: {product.rating.rate}</div>
          </div>
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="product-button"
          >
            <span>Product Details </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListDetails;
