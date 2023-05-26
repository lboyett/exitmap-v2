import "./unreviewed-user.css";
import Exit from "../../../../type-definitions/exit";
import uniqid from "uniqid";
import { Box, Button, Spinner, useStatStyles } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

interface UnreviewedExitProps {
  user: object;
}

export default function UnreviewedUser({ user }: UnreviewedExitProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function approveUser(id: number) {
    setLoading(true);
    const url = `${import.meta.env.VITE_SERVER_DOMAIN_NAME}/users/unreviewed`;
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
        {Object.keys(user).map((key: any) => {
          return (
            <Box
              key={uniqid()}
              display="flex"
              alignItems="center"
              className="content-section"
            >
              <h3>{key}:</h3>
              <div>
                {user[key as keyof object]
                  ? user[key as keyof object]
                  : "false"}
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
            approveUser((user as any)._id);
          }}
        >
          Approve
        </Button>
      )}
      <Box color="red">{error}</Box>
    </div>
  );
}
