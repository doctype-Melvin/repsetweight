import Template from "@/database/models/Templates";
import Link from "next/link";
import TemplateCard from "@/components/TemplateCard";


export default async function AllTemplates() {

  const allTemplates = await Template.find()

  return (
    <section>
      <Link href="/">&lt; Back </Link>
      <ul>
        {allTemplates.map((template) => (
          <TemplateCard template={template} key={template._id} />
        ))}
      </ul>
    </section>
  );
}