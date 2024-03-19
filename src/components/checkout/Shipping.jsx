import { useState } from "react";

export default function Shipping({ setShippingInfo, user, setBillingTrigger }) {
  const [firstName, setFirstName] = useState(() =>
    user ? user.name.firstname : ""
  );
  const [lastName, setLastName] = useState(() =>
    user ? user.name.lastname : ""
  );
  const [address, setAddress] = useState(() =>
    user ? `${user.address.number} ${user.address.street}` : ""
  );
  const [unit, setUnit] = useState();
  const [city, setCity] = useState(() => (user ? user.address.city : ""));
  const [state, setState] = useState();
  const [zipCode, setZipCode] = useState(() =>
    user ? user.address.zipcode : ""
  );
  const [phone, setPhone] = useState(() => (user ? user.phone : ""));

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
    setBillingTrigger(true);
    /* please log in to checkout (maybe check if user)
        Shipping Page
        Payment Page
        Order Submit Page

    */
  }

  return (
    <div>
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
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label>
          Apartment, Suite, Etc.:{" "}
          <input value={unit} onChange={(e) => setUnit(e.target.value)} />
        </label>
        <label>
          City: <input value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label>
          State:{" "}
          <input value={state} onChange={(e) => setState(e.target.value)} />
        </label>
        <label>
          Zip Code:{" "}
          <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        </label>
        <label>
          Phone:{" "}
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <button id="shipping Button">Continue to Billing</button>
      </form>
    </div>
  );
}
