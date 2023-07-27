"use client"

import ClientButton from "../ClientButton"
import SessionContainer from "../SessionContainer"
import { useState } from "react"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((response) => response.json())

export default function SessionList({ id, template }) {
    const { data, isLoading } = useSWR(id ? `/api/templates/${id}` : null, fetcher)

    if (!template && !data && isLoading) return <div>Loading...</div>
    return (
        <>
            {
                !template ? (
                    <div>SWR Data</div>
                ) : (
                    <div>Static Data</div>
                )
            }
            {
                !template && <ClientButton textContent="Add Day"
                modifier="center" handler={() => console.log('Add day here')} />
          }
        </>
    )
}