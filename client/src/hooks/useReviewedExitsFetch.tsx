import { useEffect, useState, useContext } from "react";
import Exit from "../type-definitions/exit";
import axios, { AxiosResponse } from "axios";
import { ExitDataContext } from "../ExitDataContext";

export default function useReviewedExitsFetch() {
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<Exit[]>();
  const [error, setError] = useState<any>();
  const { exitDataContext, setExitDataContext } = useContext(ExitDataContext)

  const url = `http://localhost:8000/exits/reviewed`;
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = (await axios.get(url)) as AxiosResponse;
        setData(response.data);
        setExitDataContext(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { data, error, loading};
}
