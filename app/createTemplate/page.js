import Form from "@/components/Form";
import Link from "next/link";
import "./styles.css"

export default function CreateTemplate() {
  return (
    <section className="page__container">
      <Link href="/"> &lt; Back </Link>
        <Form />
    </section>
  );
}


