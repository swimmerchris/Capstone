import { useState } from "react";
import Shipping from "./checkout/Shipping";
import Billing from "./checkout/Billing";
import OrderSubmission from "./checkout/OrderSubmission";
import "./css/Checkout.css";

export default function Checkout({ user, token }) {
  const [shipping, setShippingInfo] = useState({});
  const [billingAddress, setBillingAddress] = useState(null);
  const [billing, setBillingInfo] = useState(null);
  const [billingTrigger, setBillingTrigger] = useState(null);
  const [submissionTrigger, setSubmissionTrigger] = useState(null);

  return (
    <div className="checkout">
      {token ? (
        <div>
          {billingTrigger === null ? (
            <Shipping
              setBillingTrigger={setBillingTrigger}
              setShippingInfo={setShippingInfo}
              user={user}
            />
          ) : submissionTrigger === null ? (
            <Billing
              setBillingAddress={setBillingAddress}
              user={user}
              setBillingInfo={setBillingInfo}
              setSubmissionTrigger={setSubmissionTrigger}
            />
          ) : (
            <OrderSubmission
              user={user}
              billingAddress={billingAddress}
              shipping={shipping}
              billing={billing}
            />
          )}
        </div>
      ) : (
        <div className="need-login">
          <h2>You are not logged in, Please Log in to Checkout!</h2>
        </div>
      )}
    </div>
  );
}
