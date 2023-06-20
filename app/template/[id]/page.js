import Link from "next/link"
import Template from "@/database/models/Templates"
import TemplateHeader from "@/components/TemplateHeader"
import "./styles.css"

export default async function NewTemplate({ params }) {
  const { id } = params

  const template = await Template.findById(id)

  if (!template) return <div> Loading ...</div>

    return (
        <section className="modify__template__view">
            <Link className="back-link" href="/template"> &lt; Back </Link>
            <TemplateHeader name={template.name} focus={template.focus} />
            <button type="button">Add Day</button>
        </section>
    )
}

