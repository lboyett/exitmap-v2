import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default async function getCurrentUser() {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(import.meta.env.VITE_SERVER_DOMAIN);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN}/users/current-user`,
        {
          withCredentials: true,
        }
      );
      if (!response.data) throw Error("No active session");
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}
