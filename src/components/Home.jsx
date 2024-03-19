import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../api/api";
import ai_image_673482_22510142 from "../assets/ai_image_673482_22510142.png";

export default function () {
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>....Loading</div>;
  }
  if (isError) {
    return <h3>Something went wrong!</h3>;
  }
  console.log(data);
  return (
    <div>
      <div>
        <h1>Hello this is home</h1>
      </div>
      <div className="top_page_image">
        <img
          src={ai_image_673482_22510142}
          alt="random clothing and electronics"
        />
        <div></div>
        <button onClick={() => navigate("/products")}>Shop</button>
      </div>
      <div className="three_prod_container">
        <div className="home_product_info">
          <h2> {data[3].title} </h2>
          <img
            src={data[3].image}
            alt={data[3].title}
            className="product-image-card"
          />
        </div>
        <div>
          <h2> {data[5].title} </h2>
          <img
            src={data[5].image}
            alt={data[5].title}
            className="product-image-card"
          />
        </div>{" "}
        <div>
          <h2> {data[16].title} </h2>
          <img
            src={data[16].image}
            alt={data[16].title}
            className="product-image-card"
          />
        </div>
      </div>
      <div>
        <img
          src={data[13].image}
          alt={data[13].title}
          className="product-image-card"
        />
        <h2> {data[13].title} </h2>
        <p>{data[13].description}</p>
      </div>
    </div>
  );
}
