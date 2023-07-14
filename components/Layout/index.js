import Header from "../Header";
import "./styles.css";

export default function MainLayout({ children }) {
  return (
    <section className="layout__container">
      <Header />
      <main className="main__content">{children}</main>
    </section>
  );
}
