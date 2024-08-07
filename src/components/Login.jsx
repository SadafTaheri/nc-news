export default function Login() {
  const user = {
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  };
  return (
    <div style={{ border: "1px solid blue" }}>
      <h3>Welcome {user.username}! </h3>
      <img style={{ width: "150px" }} src={user.avatar_url} alt="" />
      <h4>Name: {user.name}</h4>
      <h4>Username: {user.username}</h4>
    </div>
  );
}
