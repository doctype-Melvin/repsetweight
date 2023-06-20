import Form from "@/components/Form";
import Link from "next/link";
import "./styles.css"
import dbConnect from "@/database/connectDB"
import Template from "@/database/models/Templates"
import { redirect } from "next/navigation"



export default function CreateTemplate() {

   const createTemplate = async (FormData) => {
      "use server"
      const name = FormData.get("templateName")?.valueOf();
      const focus = FormData.get("focus")?.valueOf();
      const routine = [];
    // This needs error handling
    // Don't use try catch as the redirect() will
    // trigger the catch block
        await dbConnect()
        const { id } = await Template.create({ name, focus, routine })
        redirect(`/template/${id}`)      
    }

  return (
    <section className="form__container">
      <Link className="back-link" href="/"> &lt; Back </Link>
        <Form onSubmit={createTemplate}/>
    </section>
  );
}


