import "../index.css";
import { useParams } from "react-router-dom";
import { useGetProductsByIdQuery } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data = {}, error, isLoading } = useGetProductsByIdQuery(id);

  return (
    <div key={data.id} className="data-details-container">
      <div className="data-image-container">
        <img src={data.image} alt={data.title} className="data-image" />
      </div>
      <div className="data-details-details">
        <h2> {data.title} </h2>
        <div>Price: {data.price}</div>
        <p>{data.description}</p>
        {/* <p>{data.rating}</p> */}
        <button
          onClick={() => navigate(`/products`)}
          className="details-button"
        >
          Back to Products List
        </button>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}
