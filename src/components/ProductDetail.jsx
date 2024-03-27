// This Component handles the details for the products
import { useParams } from "react-router-dom";
import { useGetProductsByIdQuery } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../cartState/cartSlice";
import { toast } from "react-toastify";
import "./css/ProductDetail.css";

export default function ProductDetail({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data = {}, error, isLoading } = useGetProductsByIdQuery(id);
  const dispatch = useDispatch();
  // handles adding an item to the cart
  function addToCart() {
    if (!token) {
      toast.error("Please Log in to add to Cart");
    } else {
      dispatch(
        addProduct({
          id: data.id,
          title: data.title,
          price: data.price,
          description: data.description,
          catergory: data.catergory,
          image: data.image,
          rating: data.rating,
        })
      );
      toast.success("Added to Cart");
    }
  }

  return (
    <div>
      <div className="spacing"></div>
      <div key={data.id} className="data-details-container">
        <div className="data-image-container">
          <img src={data.image} alt={data.title} className="data-image" />
        </div>
        <div className="data-details-details">
          <button
            onClick={() => navigate(`/products`)}
            className="details-button"
          >
            Back to Products List
          </button>
          <div className="details-header">
            <h2> {data.title} </h2>
            <p>Customer Rating: {data.rating?.rate}</p>
          </div>
          <p>{data.description}</p>
          <div className="price_add_cart">
            <div className="price">Price: ${data.price}</div>
            <button onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
