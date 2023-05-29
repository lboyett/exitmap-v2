import { useContext, useEffect, useState } from "react";
import Exit from "../type-definitions/exit";
import axios, { AxiosResponse } from "axios";
import { UserContext } from "../context/UserContext";
import { ExitDataContext } from "../context/ExitDataContext";

export default function useReviewedExitsFetch() {
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<Exit[]>();
  const [error, setError] = useState<any>();
  const [user, setUser] = useContext(UserContext);
  const [exitDataContext, setExitDataContext] = useState(null);

  useEffect(() => {
  if (user._id && user._id != 18) {
    (async () => {
      const url = `${import.meta.env.VITE_SERVER_DOMAIN_NAME}/exits/reviewed`;
      try {
        setLoading(true);
        const response = (await axios.get(url, {
          withCredentials: true,
        })) as AxiosResponse;
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  } else {
    (async () => {
      const url = `${import.meta.env.VITE_SERVER_DOMAIN_NAME}/exits/reviewed-demo`;
      try {
        setLoading(true);
        const response = (await axios.get(url, {
          withCredentials: true,
        })) as AxiosResponse;
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }
  }, [user]);
  return { data, error, loading };
}
