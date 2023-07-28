"use client"

import { SWRConfig } from "swr"

export default function SWRProvider({ children }) {
    return (<SWRConfig
            value={{fetcher: (...args) => fetch(...args).then(response => response.json())}}>
            {children}
            </SWRConfig>)
}