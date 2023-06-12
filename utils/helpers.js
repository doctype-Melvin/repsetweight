"use client"

export const sendPostTemplate = async (templateData) => {
    const response = await fetch(`/api/templates`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(templateData)
    })

    const { id } = await response.json()
    return id
}