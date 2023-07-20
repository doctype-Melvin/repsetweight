"use client"

import ClientButton from "@/components/ClientButton";
import useSWR from "swr"
import { fetcher } from "@/utils/helpers";
import TemplateHeader from "@/components/TemplateHeader";
import FormExerciseDetails from "@/components/FormExerciseDetails";

export default function CreateTemplateForm({params}){
    const { id } = params;
    console.log(id)
    const { data, isLoading } = useSWR(`/api/templates/${id}`, fetcher)

    if (!data || isLoading) return <div>Loading ... </div>

    return (
        <section>
            <TemplateHeader name={data.name} focus={data.focus} />
            <ClientButton type="submit" textContent="Add" modifier="center"  />
        </section>
    )
}