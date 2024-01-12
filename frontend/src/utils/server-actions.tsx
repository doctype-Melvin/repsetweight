"use server";

const baseUrl = "http://localhost:3030";

// Send GET request to backend
// endpoint = "/", "/templates", "/exercises", etc.
export const getData = async (endpoint: string) => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    const data = await response.json();
    console.log(`FE: successfull fetch at ${baseUrl}${endpoint}`);
    return data;
  } catch (error) {
    console.log(`failed fetch at ${baseUrl}${endpoint}`);
    return `failed fetch at ${baseUrl}${endpoint}`;
  }
};
