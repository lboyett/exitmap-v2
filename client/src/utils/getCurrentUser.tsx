import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default async function getCurrentUser() {
  console.log("function");
  try {
    const response = await axios.get("http://localhost:8000/users/current", {
      withCredentials: true,
    });
    if (false) throw Error("No active session");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
