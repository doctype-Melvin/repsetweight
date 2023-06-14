import { BackLink } from "../page"
import Template from "@/database/models/Templates"
import CustomButton from "@/components/Buttons"
import TemplateHeader from "@/components/TemplateHeader"

export default async function NewTemplate({ params }) {
  const { id } = params

  const template = await Template.findById(id)

  if (!template) return <div> Loading ...</div>

    return (
        <div>
            <BackLink href="/"> &lt; Back </BackLink>
            <TemplateHeader name={template.name} focus={template.focus} />
            <CustomButton textContent="Add Day" action="subtract" />
        </div>
    )
}

