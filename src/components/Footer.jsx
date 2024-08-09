import { Link } from "react-router-dom";
import FollowUs from "./FollowUs";

export default function Footer() {
  return (
    <footer className="bg-gray-600 text-slate-300 py-8 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb:0 ml-12">
          <h1 className="text-xl mr-12">
            NC<span className="text-rose-600">News</span>
          </h1>
        </div>

        <div className="flex space-x-4 mc-4 md:mb:0">
          <Link to="/" className="hover:text-white hover:font-bold ">
            Home
          </Link>
          <Link to="/articles" className="hover:text-white hover:font-bold">
            Articles
          </Link>
          <Link to="/topics" className="hover:text-white hover:font-bold">
            Topics
          </Link>
        </div>
        <div className="flex flex-col items-center mb-6">
          <FollowUs />
        </div>
      </div>
    </footer>
  );
}
