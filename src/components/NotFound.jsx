import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="flex items-center flex-col min-h-60 mt-20 h-screen">
      <h1 style={{ fontSize: "50px", color: "red" }}>404 - Page Not Found</h1>
      <p className="text-lg mt-10 text-slate-300">
        Sorry this page does not exist.
      </p>
      <Link to="/" className="underline text-blue-500 mt-4">
        Go to Home
      </Link>
    </div>
  );
}
