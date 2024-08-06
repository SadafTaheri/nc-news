import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <nav>
        <Link to="/">Home </Link>
        <Link to="/articles">Articles </Link>
        <Link to="/topics">Topics </Link>
        <button style={{ backgroundColor: "green" }}>
          <Link to="/login">Login</Link>
        </button>
      </nav>
    </div>
  );
}
