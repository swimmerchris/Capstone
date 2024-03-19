import { useState } from "react";
import Shipping from "./checkout/Shipping";
import Billing from "./checkout/Billing";
import OrderSubmission from "./checkout/OrderSubmission";

export default function Checkout({ user, token }) {
  const [shipping, setShippingInfo] = useState({});
  const [billingAddress, setBillingAddress] = useState(null);
  const [check, setCheck] = useState(false);
  const [billing, setBillingInfo] = useState(null);
  const [billingTrigger, setBillingTrigger] = useState(null);
  const [submissionTrigger, setSubmissionTrigger] = useState(null);

  async function shippingSubmit(event) {
    event.preventDefault();

    const shippingObj = {
      firstName,
      lastName,
      address,
      unit,
      city,
      state,
      zipCode,
      phone,
    };

    setShippingInfo(shippingObj);
    setBillingInfo(true);
    console.log(shipping);
  }

  return (
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
  );
}
