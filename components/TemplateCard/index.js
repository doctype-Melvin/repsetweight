import "./styles.css";
import Link from "next/link";
import Collapsible from "../Collapsible";

export default function TemplateCard({ template }) {
  return (
    <li className="template__card">
      <Link className="template__link" href={`template/${template.id}`}>
        <div>{template.name}</div>
      </Link>
      <div className="template__focus">Focus: {template.focus}</div>
      <div className="template__level">Level: {template.level}</div>
      {/* <p className="template__description">{template.description}</p> */}
      <Collapsible content={template.description} />
      {template.mutable && (
        <button type="button" className="edit__button">
          Edit
        </button>
      )}
      {template.mutable && (
        <button type="button" className="delete__button">
          Delete
        </button>
      )}
    </li>
  );
}
