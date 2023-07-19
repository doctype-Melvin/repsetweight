"use client"

import ClientButton from "@/components/ClientButton";
import styles from "./styles.module.css"
import useSWR from "swr"
import { fetcher } from "@/utils/helpers";
import TemplateHeader from "@/components/TemplateHeader";

export default function CreateTemplateForm({params}){
    const { id } = params;
    console.log(id)
    const { data, isLoading } = useSWR(`/api/templates/${id}`, fetcher)

    if (!data || isLoading) return <div>Loading ... </div>

    return (
        <section>
            <TemplateHeader name={data.name} focus={data.focus} />
            <form className={styles.form__styled}>
                <label htmlFor="exercise"> Exercise
                    <input type="text" name="exercise" />
                </label>
                <label htmlFor="sets"> Sets
                    <input type="number" name="sets" />
                </label>
                <label htmlFor="reps"> Reps
                    <input type="number" name="reps" />
                </label>
                <label htmlFor="weight"> Weight
                    <input type="number" name="weight" />
                </label>
            </form>
                <ClientButton type="submit" textContent="Add" modifier="center"  />
        </section>
    )
}