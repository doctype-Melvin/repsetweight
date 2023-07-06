import Template from "@/database/models/Templates";
import Link from "next/link";
import TemplateCard from "@/components/TemplateCard";
import dbConnect from "@/database/connectDB";
import styles from "./styles.module.css";

export default async function AllTemplates() {
  await dbConnect();
  const allTemplates = await Template.find();

  return (
    <section>
      <Link href="/" className="back-link">
        &lt; Back{" "}
      </Link>
      <ul className={styles.list__container}>
        {allTemplates.map((template) => (
          <TemplateCard template={template} key={template._id} />
        ))}
      </ul>
    </section>
  );
}
