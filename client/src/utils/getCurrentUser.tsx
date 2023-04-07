import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default async function getCurrentUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("http://localhost:8000/current-user", {
        withCredentials: true,
      });
      if (!response.data) throw Error("No active session");
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}
