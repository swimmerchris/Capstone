import { useState } from "react";

export default function Billing({
  setBillingAddress,
  setBillingInfo,
  setSubmissionTrigger,
}) {
  const [check, setCheck] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState();
  const [expDate, setExpDate] = useState();
  const [securityCode, setSecurityCode] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [unit, setUnit] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zipCode, setZipCode] = useState();
  const [phone, setPhone] = useState();

  async function billingSubmit(event) {
    event.preventDefault();
    const billingAddressObj = {
      firstName,
      lastName,
      address,
      unit,
      city,
      state,
      zipCode,
      phone,
    };
    const billingObj = {
      cardName,
      cardNumber,
      expDate,
      securityCode,
    };
    if (check === false) {
      setBillingAddress(billingAddressObj);
    }
    setBillingInfo(billingObj);
    setSubmissionTrigger(true);
  }

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={billingSubmit}>
        <div className="checkout-form">
          <h2>Billing Information</h2>
          <label>Card Number</label>
          <input
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <label>Name on Card</label>
          <input
            placeholder="Name on Card"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          <label>Expiration Date</label>
          <input
            placeholder="Exp. Date"
            value={expDate}
            onChange={(e) => setExpDate(e.target.value)}
          />
          <label>Security Code</label>
          <input
            placeholder="Security Code"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
          />
          <label htmlFor="checkbox">
            Same as delivery address
            <input
              id="billing-address-check"
              type="checkbox"
              value={check}
              onChange={() => setCheck(!check)}
            />
          </label>
        </div>
        {check === false ? (
          <div className="checkout-form">
            <h2>Billing Address</h2>
            <label>First name</label>
            <input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label>Last Name</label>
            <input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label>Address</label>
            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label>Apartment, Suite, Etc. </label>
            <input
              placeholder="Apartment, Suite, Etc."
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
            <label>City</label>
            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label>State</label>
            <input
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <label>Zip Code</label>
            <input
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <label>Phone</label>
            <input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        ) : (
          <div></div>
        )}
        <button id="payment Button">Submit Order</button>
      </form>
    </div>
  );
}
