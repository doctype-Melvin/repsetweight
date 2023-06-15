import Link from "next/link";
import "./styles.css"

export default function Home() {
  return (
    <section className="page__container">
      <Link href="/createTemplate" className="link__styled"> New Template </Link>
      <Link href="/allTemplates" className="link__styled"> All Templates </Link>
    </section>
  );
}




