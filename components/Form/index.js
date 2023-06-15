import dbConnect from "@/database/connectDB"
import "./styles.css"
import Template from "@/database/models/Templates"

export default function Form() {
   const createTemplate = async (FormData) => {
      "use server"
      const name = FormData.get("templateName")?.valueOf()
      const focus = FormData.get("focus")?.valueOf()
      
      await dbConnect()
      await Template.create({ name, focus })
    }
  
  return (
    <form action={createTemplate}>
      <fieldset className="fieldset__styled">
        <legend>
          <label htmlFor="templateName"> Template Name </label>
        </legend>
        <input
        className="input-field"
          type="text"
          name="templateName"
          id="templateName"
          min={1}
          max={30}
        />
      </fieldset>
      <fieldset className="fieldset__styled">
        <legend>
          <label htmlFor="focus" name="focus">
            Focus
          </label>
        </legend>
        <select name="focus" className="input-field">
          <option value="strength">Strength</option>
          <option value="hypertrophy">Hypertrophy</option>
          <option value="mobility">Mobility</option>
          <option value="conditioning">Conditioning</option>
          <option value="endurance">Endurance</option>
          <option value="general athleticism">General Athleticism</option>
          <option value="none">Other</option>
        </select>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
}

