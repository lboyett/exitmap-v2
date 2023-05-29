import { useEffect, useState } from "react";
import Exit from "../type-definitions/exit";
import axios, { AxiosResponse } from "axios";

export default function useReviewedExitsFetch() {
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<Exit[]>();
  const [error, setError] = useState<any>();

  const url = `${import.meta.env.VITE_SERVER_DOMAIN_NAME}/exits/reviewed`;
  useEffect(() => {
    (async () => {
    console.log('useReviewedExitsFetch is running!!!!!!!!')
      try {
        setLoading(true);
        const response = (await axios.get(url)) as AxiosResponse;
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
