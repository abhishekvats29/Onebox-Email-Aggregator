import axios from "axios";
import type { Email } from "../types/email.ts";


const BASE_URL = "https://onebox-backend-apx8.onrender.com";

export const getEmails = async (): Promise<Email[]> => {
  const response = await axios.get(`${BASE_URL}/emails`);
  return response.data;
};
