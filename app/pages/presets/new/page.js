import Form from "@/components/Form";
import Link from "next/link";
import styles from "./styles.module.css";
import dbConnect from "@/database/connectDB";
import Preset from "@/database/models/Presets";
import { redirect } from "next/navigation";

export default function CreateTemplate() {
  return (
    <section className={styles.form__container}>
      Users can create a new preset here
    </section>
  );
}
