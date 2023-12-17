import Preset from "@/database/models/Presets";
import Link from "next/link";
import TemplateCard from "@/components/TemplateCard";
import dbConnect from "@/database/connectDB";
import styles from "./styles.module.css";
import { executeQuery } from "@/database/connectDB";

export default function AllTemplates() {
  const allTemplates = executeQuery({
    query: "SELECT * FROM template",
  });

  return allTemplates && <section>List all presets here</section>;
}
