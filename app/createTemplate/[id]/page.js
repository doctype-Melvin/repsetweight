import { BackLink } from "../page"
import Template from "@/database/models/Templates"
import CustomButton from "@/components/Buttons"

export default async function NewTemplate({ params }) {
  const { id } = params

  const template = await Template.findById(id)

  if (!template) return <div> Loading ...</div>

    return (
        <div>
            <BackLink href="/"> &lt; Back </BackLink>
            <h1>{template.name}</h1>
            <p>{template.focus}</p>
            <CustomButton textContent="Add Day" action="subtract" />
        </div>
    )
}