import { productsCart, total } from "../../cartState/cartSlice";
import { useSelector } from "react-redux";

export default function OrderSubmission({
  user,
  billingAddress,
  shipping,
  billing,
}) {
  const currentCart = useSelector(productsCart);
  const currentTotal = useSelector(total);

  return (
    <div>
      <div>
        <h2>Thank you {user.name.firstname} for ordering with eHub!</h2>
        <p>Order Number: "random"</p>
      </div>
      {billingAddress ? (
        <div>
          billingAddress
          <p>
            Name: {billingAddress.firstName} {billingAddress.lastName}
            Address: {billingAddress.address}
            {billingAddress.city}, {billingAddress.state}{" "}
            {billingAddress.zipcode}
          </p>
          <div>
            shipping
            <p>
              Name: {shipping.firstName} {shipping.lastName}
              Address: {shipping.address}
              {shipping.city}, {shipping.state} {shipping.zipcode}
            </p>
          </div>
        </div>
      ) : (
        <div>
          shipping
          <p>
            Name: {shipping.firstName} {shipping.lastName}
            Address: {shipping.address}
            {shipping.city}, {shipping.state} {shipping.zipcode}
          </p>
        </div>
      )}
      <div>
        Payment Info:
        <p>
          Card Number: ****
          {billing.cardNumber.substring(billing.cardNumber.length - 4)}
          Name on Card: {billing.cardName}
        </p>
      </div>
      {currentCart ? (
        <div>
          <div>
            {currentCart.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-card-container">
                  <h3> {product.title} </h3>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image-card"
                  />

                  <span>Total: ${product.price * product.quantity}</span>
                </div>
              </div>
            ))}
          </div>
          <span>Current Total: ${currentTotal}</span>
        </div>
      ) : (
        <div>Your Cart is Empty, Please Log in and Add to Cart</div>
      )}
    </div>
  );
}
