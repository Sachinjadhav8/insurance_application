import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export const api = (authHeader) =>
  axios.create({
    baseURL: API_BASE,
    headers: { Authorization: authHeader },
  });

