import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from "react";

export default async function getCurrentUser() {
  console.log("GET CURRENT USER IS CALLED")
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_DOMAIN_NAME}/users/current-user`,
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
