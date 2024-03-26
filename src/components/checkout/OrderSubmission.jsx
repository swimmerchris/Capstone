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
  console.log(shipping);
  return (
    <div className="order-container">
      <div className="submission-container">
        <h2>
          Thank you{" "}
          {() => {
            user.name.firstname;
          }}{" "}
          for ordering with eHub!
        </h2>
        <p>Order Number: {Math.floor(100000 + Math.random() * 900000)}</p>
      </div>
      <div className="details-containers">
        <div className="billing-addresses">
          <h2>Order Details:</h2>
          {billingAddress ? (
            <div className="addresses">
              <div>
                <h3>Billing Address </h3>
                <p>
                  Name: {billingAddress.firstName} {billingAddress.lastName}
                </p>
                <p>
                  Address: {billingAddress.address}, {"\n"}
                  {billingAddress.city}, {billingAddress.state}
                  {billingAddress.zipCode}
                </p>
              </div>
              <div>
                <h3> Shipping Address</h3>
                <p>
                  Name: {shipping.firstName} {shipping.lastName} {"\n"}{" "}
                </p>
                <p>
                  Address: {shipping.address} {"\n"}
                  {shipping.city}, {"\n"} {shipping.state} {"\n"}{" "}
                  {shipping.zipCode}
                </p>
              </div>
            </div>
          ) : (
            <div className="addresses">
              <div>
                <h3>Billing Address </h3>
                <p>
                  Name: {shipping.firstName} {shipping.lastName}
                </p>
                <div>
                  Address: {shipping.address} {"\n"}
                  {shipping.city}, {shipping.state} {shipping.zipCode}
                </div>
              </div>
              <div>
                <h3> Shipping Address</h3>
                <p>
                  Name: {shipping.firstName} {shipping.lastName}
                </p>
                <p>
                  Address: {shipping.address}
                  {shipping.city}, {shipping.state} {shipping.zipCode}
                </p>
              </div>
            </div>
          )}
          <div>
            <h3>Payment Info: </h3>
            <p>
              Card Number: ****
              {billing.cardNumber.substring(billing.cardNumber.length - 4)}
            </p>
            <p>Name on Card: {billing.cardName}</p>
          </div>
          <div className="checkout-total">
            <span id="cart-total">Order Total: ${currentTotal}</span>
          </div>
        </div>
        {currentCart ? (
          <div className="order-items-container">
            <div className="product-card">
              {currentCart.map((product) => (
                <div key={product.id} className="product-card-container">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image-card"
                  />
                  <div className="center">
                    <h3> {product.title} </h3>
                    <h3>Quantity: {product.quantity}</h3>
                  </div>

                  <span className="total">
                    Total: <div>${product.price * product.quantity} </div>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Your Cart is Empty, Please Log in and Add to Cart</div>
        )}
      </div>
    </div>
  );
}
