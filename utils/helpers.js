"use client";

export const sendPostTemplate = async (templateData) => {
  const response = await fetch(`/api/templates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(templateData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  } else {
    const { _id: id } = await response.json();
    return id;
  }
};
