// This component is the home screen to welcome people to the site and provide a few featured product
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../api/api";
import "./css/Home.css";

export default function () {
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>....Loading</div>;
  }
  if (isError) {
    return <h3>Something went wrong!</h3>;
  }

  return (
    <div>
      <div className="top_page_image">
        <h1>Welcome to eHub</h1>
        <button onClick={() => navigate("/products")} className="shop_button">
          Shop
        </button>
      </div>
      <div className="three_prod_container">
        <div
          className="home_product_info"
          onClick={() => navigate(`/products/${data[3].id}`)}
        >
          <h2> {data[3].title} </h2>
          <img
            src={data[3].image}
            alt={data[3].title}
            className="product-image-card"
          />
        </div>
        <div
          className="home_product_info"
          onClick={() => navigate(`/products/${data[5].id}`)}
        >
          <h2> {data[5].title} </h2>
          <img
            src={data[5].image}
            alt={data[5].title}
            className="product-image-card"
          />
        </div>
        <div
          className="home_product_info"
          onClick={() => navigate(`/products/${data[16].id}`)}
        >
          <h2> {data[16].title} </h2>
          <img
            src={data[16].image}
            alt={data[16].title}
            className="product-image-card"
          />
        </div>
      </div>
      <div className="home_product_featured">
        <img
          src={data[13].image}
          alt={data[13].title}
          className="featured-image-card"
          onClick={() => navigate(`/products/${data[13].id}`)}
        />
        <h2> {data[13].title} </h2>
        <p>{data[13].description}</p>
      </div>
    </div>
  );
}
