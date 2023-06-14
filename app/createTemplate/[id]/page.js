import { BackLink } from "../page"
import Template from "@/database/models/Templates"
import { ConfirmationButton as AddDayButton } from "@/components/Buttons"

export default async function NewTemplate({ params }) {
  const { id } = params

  const template = await Template.findById(id)

  if (!template) return <div> Loading ...</div>

    return (
        <div>
            <h1>{template.name}</h1>
            <p>{template.focus}</p>
            <p>Add workout days</p>
            <AddDayButton> Add Day </AddDayButton>
            <BackLink href="/"> &lt; Back </BackLink>
        </div>
    )
}