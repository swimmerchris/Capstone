import { useGetUserQuery } from "../api/api";

export default function Account({ token, user, setUserId, setUser }) {
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

  console.log(user);

  return (
    <section key={user.id} className="user-details-container">
      <div className="user-details-card">
        <h2> User Account Info:</h2>
        <div className="user-info">
          <p>Frist Name: {user.name.firstname} </p>
          <p>Last Name: {user.name.lastname} </p>
          <p>Email Address: {user.email}</p>
        </div>
      </div>
    </section>
  );
}
