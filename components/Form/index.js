
import CustomButton from "../Buttons";
import { sendPostTemplate } from "@/utils/helpers";


const createTemplate = async (templateData) => {

  console.log('create template')
}


export default function Form() {
  
  return (
    <form action={createTemplate}>
      <fieldset>
        <legend>
          <label htmlFor="templateName">Template Name</label>
        </legend>
        <input
          type="text"
          name="templateName"
          id="templateName"
          min={1}
          max={30}
        />
      </fieldset>
      <fieldset>
        <legend>
          <label htmlFor="focus" name="focus">
            Focus
          </label>
        </legend>
        <select name="focus">
          <option value="strength">Strength</option>
          <option value="hypertrophy">Hypertrophy</option>
          <option value="mobility">Mobility</option>
          <option value="conditioning">Conditioning</option>
          <option value="endurance">Endurance</option>
          <option value="athleticism">General Athleticism</option>
          <option value="none">Other</option>
        </select>
      </fieldset>
      <CustomButton type="submit" textContent="Submit" />
    </form>
  );
}

