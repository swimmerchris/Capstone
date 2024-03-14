import "../index.css";
import { useParams } from "react-router-dom";
import { useGetProductsByIdQuery } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, productsCart } from "../cartState/cartSlice";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data = {}, error, isLoading } = useGetProductsByIdQuery(id);
  const dispatch = useDispatch();
  const currentCart = useSelector(productsCart);

  function addToCart() {
    if (!currentCart) {
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
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
