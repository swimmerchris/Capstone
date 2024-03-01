/* pull in a cart for a logged in user 
    if no cart exsist and local storage for cart is empty I will render a cart empty
    if cart exsist I will pull and populate data into local storage.
    if local storage has cart items I will loop through items and populate them. 
    I need to pull products by id and push objects into array. 
    local storage should pull active date a userId and products (array of objects).  
*/

import { useState, useEffect } from "react";
import {
  useGetCartByUserQuery,
  useGetAllCartsQuery,
  useGetAllProductsQuery,
} from "../api/api";

export default function Cart({ user, token, userId }) {
  const [cartArray, setCartArray] = useState();
  const { data: data = {}, error, isLoading } = useGetCartByUserQuery(userId);
  const {
    data: productsData = {},
    error2,
    isLoading2,
  } = useGetAllProductsQuery();
  //   need to make the above a function that's imported

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <h3>Something went wrong!</h3>;
  }

  if (data) {
    data.forEach((cart) => {
      console.log("New cart");
      const products = cart.products;
      const cartDetails = products.map((product) => {
        const prodId = product.productId;
        console.log(prodId);
        const productDetails = productsData.find((p) => p.id === prodId);
        return productDetails;
      });
      console.log(cartDetails);
    });
    console.log(data);
  }
  return (
    <div>Hello Welcome to the Cart</div>
    // <div>
    //   {data.map((product) => (
    //     <div key={product.id} className="product-card">
    //       <div className="product-card-container">
    //         <h2> {product.title} </h2>
    //         <img
    //           src={product.image}
    //           alt={product.title}
    //           className="product-image-card"
    //         />
    //         <button
    //           onClick={() => navigate(`/products/${product.id}`)}
    //           className="product-button"
    //         >
    //           <span>Product Details </span>
    //         </button>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}
