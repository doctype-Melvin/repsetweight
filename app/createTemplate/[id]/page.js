import Link from "next/link"
import Template from "@/database/models/Templates"

export default async function NewTemplate({ params }) {
  const { id } = params

  const template = await Template.findById(id)

  if (!template) return <div> Loading ...</div>

    return (
        <div>
            <Link href="/"> &lt; Back </Link>
            <div>{template.name}</div>
            <button type="button">Add Day</button>
        </div>
    )
}

