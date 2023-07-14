import "./styles.css";
import Link from "next/link";

export default function Navigation() {
  return (
  <nav className="navigation__container">
    <ul className="navigation__links">
      <li className="navigation__item">
        <Link className="navigation__link" href="/presets">All Templates</Link>
      </li>
      <li className="navigation__item">
        <Link className="navigation__link" href="/presets/new">Customize</Link>
      </li>
    </ul>
  </nav>
  );
}
