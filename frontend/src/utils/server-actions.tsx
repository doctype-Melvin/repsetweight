"use server";

const baseUrl = "http://localhost:3030";

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    const data = await response.json();
    console.log(`successfull fetch at ${baseUrl}${endpoint}`);
    return data;
  } catch (error) {
    console.log(`failed fetch at ${baseUrl}${endpoint}`);
    return `failed fetch at ${baseUrl}${endpoint}`;
  }
};
