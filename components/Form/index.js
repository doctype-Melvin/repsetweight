import "./styles.css";
import ClientButton from "../ClientButton";

export default function Form({ onSubmit }) {
  const tempHandler = async () => {
    "use server";
    console.log("Submit Template Form");
  };

  return (
    <form action={onSubmit} autoComplete="off">
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
          required
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
          <option value="conditioning">Conditioning</option>
          <option value="endurance">Endurance</option>
          <option value="general athleticism">General Athleticism</option>
          <option value="other">Other</option>
        </select>
      </fieldset>
      <fieldset className="fieldset__styled">
        <legend>
          <label htmlFor="description" name="description">
            Description
          </label>
        </legend>
        <input
          className="input-field"
          type="text"
          max={250}
          name="description"
        />
      </fieldset>
      <ClientButton type="submit" textContent="Submit" />
    </form>
  );
}
