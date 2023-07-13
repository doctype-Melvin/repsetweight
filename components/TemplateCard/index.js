import "./styles.css";
import Link from "next/link";
import Collapsible from "../Collapsible";

export default function TemplateCard({ template }) {
  return (
    <li className="template__card">
      <Link className="template__link" href={`presets/${template.id}`}>
        <div>{template.name}</div>
      </Link>
      <div className="template__focus">Focus: {template.focus}</div>
      <div className="template__level">Level: {template.level}</div>
      <Collapsible content={template.description} />
    </li>
  );
}
