import "./styles.css"
import Link from "next/link"

export default function TemplateCard( { template } ) {
    return (
        <li className="template__card">
        <Link className="template__link" href={`template/${template.id}`}>
        <div>{template.name}</div>
        <div>{template.focus}</div>
        </Link>
        <button type="button" className="edit__button">Edit</button>
        <button type="button" className="delete__button">Delete</button>
        </li>
    )
}

