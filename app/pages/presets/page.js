import Preset from "@/database/models/Presets";
import Link from "next/link";
import TemplateCard from "@/components/TemplateCard";
import dbConnect from "@/database/connectDB";
import styles from "./styles.module.css";
import { queryAllTemplates } from "@/database/connectDB";

export default async function AllTemplates() {
  // await dbConnect();
  // const allPresets = await Preset.find();
  const allTemplates = await queryAllTemplates({
    query: "SELECT * FROM templates",
  });
  return <section>List all presets here</section>;
}
