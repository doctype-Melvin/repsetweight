import Preset from "@/database/models/Presets";
import Link from "next/link";
import TemplateCard from "@/components/TemplateCard";
import dbConnect from "@/database/connectDB";
import styles from "./styles.module.css";

export default async function AllTemplates() {
  // await dbConnect();
  // const allPresets = await Preset.find();

  return <section>List all presets here</section>;
}
