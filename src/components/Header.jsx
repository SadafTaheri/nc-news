import FollowUs from "./FollowUs";
import Navbar from "./Navbar";
import SerachBox from "./SearchBox";

export default function Header() {
  return (
    <header className="py-6 md:py-12">
      <Navbar />
      <SerachBox />
      <FollowUs />
    </header>
  );
}
