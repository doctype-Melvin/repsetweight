import Template from "@/database/models/Templates";
import Link from "next/link";
import TemplateCard from "@/components/TemplateCard";
import dbConnect from "@/database/connectDB";


export default async function AllTemplates() {
  await dbConnect()
  const allTemplates = await Template.find()

  return (
    <section>
      <Link href="/" className="back-link">&lt; Back </Link>
      <ul>
        {allTemplates.map((template) => (
          <TemplateCard template={template} key={template._id} />
        ))}
      </ul>
    </section>
  );
}