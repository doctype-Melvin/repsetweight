import Link from "next/link";
import "./styles.css";

export default function Home() {
  return (
    <section className="page__container">
      <Link href="/template/new" className="link__styled">
        {" "}
        New Template{" "}
      </Link>
      <Link href="/template" className="link__styled">
        {" "}
        All Templates{" "}
      </Link>
    </section>
  );
}
