import Link from "next/link"

export default async function PresetQuestions({params}) {
    const { id } = params
    return (
        <section>
            <Link href={`/presets/${id}`}>&lt; Back</Link>
            This is where users are asked some questions 
            {/* Form */}
        </section>
    )
}