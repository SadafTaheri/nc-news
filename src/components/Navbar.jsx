import { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <nav className="flex mt-10 items-center text-slate-300">
        <div className="flex items-center">
          <h1 className="text-3xl mr-12">
            NC<span className="text-rose-600">News</span>
            <p className="text-xs text-center text-slate-500 font-light">
              Articles Review
            </p>
          </h1>
          <ul className="hidden md:flex gap-6 uppercase">
            <li>
              <Link to="/">Home </Link>
            </li>
            <li>
              <Link to="/articles">Articles </Link>
            </li>
            <li>
              <Link to="/topics">Topics </Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:block ml-auto">
          <button className="bg-rose-600 hover:bg-rose-500 px-6 py-3 rounded-2xl uppercase text-white">
            <Link to="/login">Login</Link>
          </button>
        </div>
        <div className="md:hidden ml-auto">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="33"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
        </div>
      </nav>
      <div
        className={`md:hidden bg-slate-900 text-center     overflow-hidden transition-all duration-200 text-slate-300 ${
          isMenuOpen ? " py-4 border-t-2 border-slate-700" : "py-0  border-none"
        }`}
        style={{ height: isMenuOpen ? 220 : 0 }}
      >
        <ul className="flex flex-col gap-4">
          <li>
            <Link to="/">Home </Link>
          </li>
          <li>
            <Link to="/articles">Articles </Link>
          </li>
          <li>
            <Link to="/topics">Topics </Link>
          </li>
        </ul>
        <div className="mt-8 border-t-2 items-center pt-4 border-slate-700">
          <Link to="/login" className="bg-rose-600 rounded py-2 px-4">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
