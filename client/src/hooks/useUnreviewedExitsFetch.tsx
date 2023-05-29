import { useEffect, useState } from "react";
import Exit from "../type-definitions/exit";
import axios, { AxiosResponse } from "axios";

export default function useUnreviewedExitsFetch() {
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<Exit[]>();
  const [error, setError] = useState<any>();

  const url = `${import.meta.env.VITE_SERVER_DOMAIN_NAME}/exits/unreviewed`;
  useEffect(() => {
    (async () => {
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
  }, []);
  return { data, error, loading };
}
