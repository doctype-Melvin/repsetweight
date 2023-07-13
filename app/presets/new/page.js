import Form from "@/components/Form";
import Link from "next/link";
import styles from "./styles.module.css";
import dbConnect from "@/database/connectDB";
import Preset from "@/database/models/Presets";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";

export default function CreateTemplate() {
  const createTemplate = async (FormData) => {
    "use server";
    const name = FormData.get("templateName")?.valueOf();
    const focus = FormData.get("focus")?.valueOf();
    const initialDay = {
      day: 1,
      exercises: [],
      id: nanoid(4),
    };
    const routine = [initialDay];
    // This needs error handling
    // Don't use try catch as the redirect() will
    // trigger the catch block
    await dbConnect();
    const { id } = await Preset.create({ name, focus, routine, mutable: true, isCurrent: false });
    redirect(`/presets/${id}`);
  };

  return (
    <section className={styles.form__container}>
      <Link className="back-link" href="/">
        {" "}
        &lt; Back{" "}
      </Link>
      <Form onSubmit={createTemplate} />
    </section>
  );
}
