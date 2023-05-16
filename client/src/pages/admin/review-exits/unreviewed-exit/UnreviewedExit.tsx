import "./unreviewed-exit.css";
import Exit from "../../../../type-definitions/exit";
import uniqid from "uniqid";
import { Box, Button, Spinner, useStatStyles } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

interface UnreviewedExitProps {
  exit: Exit;
}

export default function UnreviewedExit({ exit }: UnreviewedExitProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function approveExit(id: number) {
    setLoading(true);
    const url = `${import.meta.env.VITE_SERVER_DOMAIN}/exits/unreviewed`;
    try {
      const response = await axios.post(`${url}/${id}`, { id: id });
      setError("");
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError("Error with request. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="unreviewed-exit-card">
      <div className="card-content">
        {Object.keys(exit).map((key: any) => {
          return (
            <Box
              key={uniqid()}
              display="flex"
              alignItems="center"
              className="content-section"
            >
              <h3>{key}:</h3>
              <div>
                {exit[key as keyof Exit] ? exit[key as keyof Exit] : "false"}
              </div>
            </Box>
          );
        })}
      </div>

      {loading ? (
        <Spinner />
      ) : success ? (
        <Box color="green.400">Approved</Box>
      ) : (
        <Button
          onClick={() => {
            approveExit(exit._id);
          }}
        >
          Approve
        </Button>
      )}
      <Box color="red">{error}</Box>
    </div>
  );
}
