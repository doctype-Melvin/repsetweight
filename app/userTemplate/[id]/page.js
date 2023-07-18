import Preset from "@/database/models/Presets";

export default async function CreateTemplateForm({params}){
    const { id } = params;
    const newTemplate = await Preset.findById(id);
    console.log(newTemplate)
}