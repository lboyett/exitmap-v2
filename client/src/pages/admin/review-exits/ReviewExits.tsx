import "./review-exits.css";
import { Box, List, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useUnreviewedExitsFetch from "../../../hooks/useUnreviewedExitsFetch";
import Exit from "../../../type-definitions/exit";
import UnreviewedExit from "./unreviewed-exit/UnreviewedExit";

export default function ReviewExits() {
  const { data, error, loading } = useUnreviewedExitsFetch(); //FixThis
  const [exits, setExits] = useState<Exit[]>();

  useEffect(() => {
    if (data !== undefined) setExits(data);
  }, [data]);
  return (
    <div className="review-exits-page">
      <List className="review-exits-list">
        {exits && exits.length > 0 ? (
          exits?.map((exit) => {
            return (
              <ListItem color="white" key={exit._id}>
                <UnreviewedExit exit={exit} />
              </ListItem>
            );
          })
        ) : (
          <Box p="2rem">No unreviewed exits</Box>
        )}
      </List>
    </div>
  );
}
