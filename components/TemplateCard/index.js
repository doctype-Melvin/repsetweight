import "./styles.css";
import Link from "next/link";

export default function TemplateCard({ template }) {
  return (
    <li className="template__card">
      <Link className="template__link" href={`template/${template.id}`}>
        <div>{template.name}</div>
      </Link>
      <div className="template__focus">{template.focus}</div>
      <button type="button" className="edit__button">
        Edit
      </button>
      <button type="button" className="delete__button">
        Delete
      </button>
    </li>
  );
}
