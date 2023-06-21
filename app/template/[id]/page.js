import Link from "next/link"
import Template from "@/database/models/Templates"
import TemplateHeader from "@/components/TemplateHeader"
import SessionForm from "@/components/SessionForm"
import "./styles.css"
import Exercise from "@/database/models/Exercises"

export default async function NewTemplate({ params }) {
  const { id } = params

  const template = await Template.findById(id)
  const exercises = await JSON.parse(JSON.stringify(await Exercise.find()))

 
  if (!template || !exercises) return <div> Loading ...</div>

    return (
        <section className="modify__template__view">
            <Link className="back-link" href="/template"> &lt; Back </Link>
            <TemplateHeader name={template.name} focus={template.focus} />
            {
                template.routine.map(session => <div key={session.id}>Day {session.day}</div>)
            }
            {/* Fetch the routine array */}
            {/* Render the first day of a new template */}
            {/* The day component allows for CRUDing exercises  */}
        </section>
    )
}

