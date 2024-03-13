import { useState } from "react";

export default function Checkout() {
  const [shipping, setShippingInfo] = useState({});
  const [check, setCheck] = useState(false);
  const [billing, setBillingInfo] = useState(null);
  const [billingAddress, setBillingAddress] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [unit, setUnit] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zipCode, setZipCode] = useState();
  const [phone, setPhone] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [cardName, setCardName] = useState();
  const [expDate, setExpDate] = useState();
  const [securityCode, setSecurityCode] = useState();

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
    /* please log in to checkout (maybe check if user)
        Shipping Page
        Payment Page
        Order Submit Page

    */
  }

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

    setBillingAddress(billingAddressObj);
    setBillingInfo();
    /* please log in to checkout (maybe check if user)
        Shipping Page
        Payment Page
        Order Submit Page

    */
  }
  return (
    <div>
      {billing === null ? (
        <form onSubmit={shippingSubmit}>
          <label>
            First name
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            First name
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            Address:{" "}
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label>
            Apartment, Suite, Etc.:{" "}
            <input value={unit} onChange={(e) => setUnit(e.target.value)} />
          </label>
          <label>
            City:{" "}
            <input value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
          <label>
            State:{" "}
            <input value={state} onChange={(e) => setState(e.target.value)} />
          </label>
          <label>
            Zip Code:{" "}
            <input
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </label>
          <label>
            Phone:{" "}
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <button id="shipping Button">Continue to Billing</button>
        </form>
      ) : (
        <form onSubmit={billingSubmit}>
          <label>
            Card Number
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </label>
          <label>
            Name on Card
            <input
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </label>
          <label>
            Expiration Date
            <input
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
            />
          </label>
          <label>
            Security Code
            <input
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
            />
          </label>
          <label htmlFor="checkbox">
            Same as delivery address
            <input
              type="checkbox"
              value={check}
              onChange={() => setCheck(!check)}
            />
          </label>
          <button id="payment Button">Pay Now</button>
        </form>
      )}
    </div>
  );
}
