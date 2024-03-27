// This Compoent is used to manage the account informaiton

import React from "react";
import "./css/Account.css";
import user_149071 from "../assets/user_149071.png";

export default function Account({ user }) {
  //   The below handles capitalizing the first and last names if they aren't already capitalized
  const firstName =
    user?.name.firstname.charAt(0).toUpperCase() +
    user?.name.firstname.slice(1);
  const lastName =
    user?.name.lastname.charAt(0).toUpperCase() + user?.name.lastname.slice(1);

  return (
    <div>
      {user !== null ? (
        <div key={user.id} className="user-details-container">
          <div className="user-details-card">
            <img src={user_149071} alt="user icon" />
            <h2>User Account Info:</h2>
            <div className="user-info">
              <div>
                {firstName} {lastName}
              </div>
              <div>Email Address: {user.email}</div>
              <div>{user.phone}</div>
            </div>
            <div>
              <h2>Default Address</h2>
              <div>
                {user.address.number} {user.address.street}
              </div>
              <div>{user.address.zipcode}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="user-details-container">
          <div className="need-login">
            <h2>Please Log in to See Account info</h2>
          </div>
        </div>
      )}{" "}
    </div>
  );
}
