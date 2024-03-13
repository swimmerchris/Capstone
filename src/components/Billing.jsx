export default function Billing() {
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
        <button id="payment Button">Pay Now</button>
      </form>
    </div>
  );
}
