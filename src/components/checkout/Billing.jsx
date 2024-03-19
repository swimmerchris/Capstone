import { useState } from "react";

export default function Billing({
  setBillingAddress,
  user,
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
    /* please log in to checkout (maybe check if user)
        Shipping Page
        Payment Page
        Order Submit Page

    */
  }
  console.log(check);
  return (
    <div>
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
          <input value={expDate} onChange={(e) => setExpDate(e.target.value)} />
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
        {check === false ? (
          <div>
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
          </div>
        ) : (
          <div></div>
        )}
        <button id="payment Button">Submit Order</button>
      </form>
    </div>
  );
}
