import { useGetUserQuery } from "../api/api";

export default function Account({ token, user }) {
  const { data = {}, error, isLoading } = useGetUserQuery(token);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <h3>Something went wrong!</h3>;
  }
  const userInfo = data.filter((currentUser) => {
    return currentUser.username === user;
  });

  if (userInfo[0]) {
    return (
      <section key={userInfo[0].id} className="user-details-container">
        <div className="user-details-card">
          <h2> User Account Info:</h2>
          <div className="user-info">
            <p>Frist Name: {userInfo[0].name.firstname} </p>
            <p>Last Name: {userInfo[0].name.firstname} </p>
            <p>Email Address: {userInfo[0].email}</p>
          </div>
        </div>
      </section>
    );
  }
}
