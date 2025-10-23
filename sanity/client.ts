import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "8ie39onw",
  dataset: "production",      
  apiVersion: "2024-01-01", 
  token: process.env.SANITY_API_TOKEN,      
  useCdn: false,
});