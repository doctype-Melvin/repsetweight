import Form from "@/components/Form";
import Link from "next/link";
import "./styles.css"


export default function CreateTemplate() {
 
  return (
    <section className="form__container">
      <Link className="back-link" href="/"> &lt; Back </Link>
        <Form />
    </section>
  );
}


