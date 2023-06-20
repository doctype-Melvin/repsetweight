import Link from "next/link"
import Template from "@/database/models/Templates"
import TemplateHeader from "@/components/TemplateHeader"
import WorkoutDayForm from "@/components/WorkoutDayForm"
import "./styles.css"

export default async function NewTemplate({ params }) {
  const { id } = params

  const template = await Template.findById(id)
 
  if (!template) return <div> Loading ...</div>

    return (
        <section className="modify__template__view">
            <Link className="back-link" href="/template"> &lt; Back </Link>
            <TemplateHeader name={template.name} focus={template.focus} />
            <WorkoutDayForm />
            {/* Client component handles all the user's input */}
            {/* Create a component that has a button to toggle a form */}
            {/* The form should allow for exercise choice and parameters */}
            {/* Think about a progression model */}
        </section>
    )
}

