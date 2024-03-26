import { useState } from "react";

export default function Shipping({ setShippingInfo, user, setBillingTrigger }) {
  const [firstName, setFirstName] = useState(() =>
    user
      ? user.name.firstname.charAt(0).toUpperCase() +
        user.name.firstname.slice(1)
      : ""
  );
  const [lastName, setLastName] = useState(() =>
    user
      ? user.name.lastname.charAt(0).toUpperCase() + user.name.lastname.slice(1)
      : ""
  );
  const [address, setAddress] = useState(() =>
    user ? `${user.address.number} ${user.address.street}` : ""
  );
  const [unit, setUnit] = useState();
  const [city, setCity] = useState(() =>
    user
      ? user.address.city.charAt(0).toUpperCase() + user.address.city.slice(1)
      : ""
  );
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
    <div className="checkout-container">
      <h2>Shipping Address</h2>
      <form className="checkout-form" onSubmit={shippingSubmit}>
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
        <button id="shipping Button">Continue to Billing</button>
      </form>
    </div>
  );
}
