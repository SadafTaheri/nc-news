export default function Login() {
  const user = {
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  };
  return (
    <div
      style={{ border: "1px solid gray" }}
      className="container rounded-lg items-center text-slate-300 flex flex-col"
    >
      <h3 className="text-rose-600 text-xl mt-6">Welcome {user.username}! </h3>
      <img
        style={{ width: "200px" }}
        className="mt-6"
        src={user.avatar_url}
        alt=""
      />
      <h4 className="mt-5">Name: {user.name}</h4>
      <h4>Username: {user.username}</h4>
    </div>
  );
}
