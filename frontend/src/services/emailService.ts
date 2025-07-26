import axios from "axios";
import type { Email } from "../types/email.ts";


const BASE_URL = "http://localhost:3000/api/emails";

export const getEmails = async (): Promise<Email[]> => {
  const response = await axios.get(`${BASE_URL}/emails`);
  return response.data;
};
