import "./styles.css";
import Link from "next/link";
import { SlHome as Home } from "react-icons/sl";
import { SlBookOpen as Book } from "react-icons/sl";
import { AiOutlineFileAdd as Write } from "react-icons/ai";

export default function Navigation() {
  return (
    <nav className="navigation__container">
      <ul className="navigation__links">
        <li key="home-link" className="navigation__item">
          <Link className="navigation__link" href="/">
            <Home />
          </Link>
        </li>
        <li key="all-templates-link" className="navigation__item">
          <Link className="navigation__link" href="/presets">
            <Book />
          </Link>
        </li>
        <li key="create-template-link" className="navigation__item">
          <Link className="navigation__link" href="/presets/new">
            <Write />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
