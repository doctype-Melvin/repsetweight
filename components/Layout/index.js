import Header from "../Header";
import Navigation from "../Navigation";

export default function MainLayout({ children }) {
  return (
    <section>
      <Header />
      <main>{children}</main>
      <Navigation />
    </section>
  );
}


