import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default async function getCurrentUser() {
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
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     const response = {
  //       avatar_key: "",
  //       created_at: "2023-05-26T07:50:14.000Z",
  //       email: "demo@demo.com",
  //       hashed_password: "",
  //       is_admin: false,
  //       is_approved: true,
  //       is_deleted: false,
  //       salt: "",
  //       _id: 10000,
  //       first_name: "Demo",
  //       last_name: "User",
  //       username: "demo_user"
  //     }
  //     resolve(response);
  //   } catch (err) {
  //     reject(err);
  //   }
  // })
}
