import Link from "next/link"
import Template from "@/database/models/Templates"
import TemplateHeader from "@/components/TemplateHeader"
import "./styles.css"

export default async function NewTemplate({ params }) {
  const { id } = params

  const template = await Template.findById(id)

  if (!template) return <div> Loading ...</div>

    return (
        <section className="create__template__container">
            <Link href="/"> &lt; Back </Link>
            <TemplateHeader name={template.name} focus={template.focus} />
            <button type="button">Add Day</button>
        </section>
    )
}

// First redo the directory structure
// replace createTemplate dir path with something like
// template/new/*here is the page with the form* 
// template/[id]/*individual template page*
// template/all/*all templates page*
// Now remove the allTemplates directory