import "./styles.css";

export default function Header({ headerText }) {
  return (
    <section className="header__container">
      {headerText}
      Header
    </section>
  );
}
