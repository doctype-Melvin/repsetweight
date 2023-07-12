import Preset from "@/database/models/Presets";
import Link from "next/link";
import TemplateCard from "@/components/TemplateCard";
import dbConnect from "@/database/connectDB";
import styles from "./styles.module.css";

export default async function AllTemplates() {
  await dbConnect();
  const allPresets = await Preset.find();

  return (
    <section>
      <Link href="/" className="back-link">
        &lt; Back{" "}
      </Link>
      <ul className={styles.list__container}>
        {allPresets.map((preset) => (
          <TemplateCard template={preset} key={preset._id} />
        ))}
      </ul>
    </section>
  );
}
