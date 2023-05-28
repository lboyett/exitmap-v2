import "./review-users.css";
import { Box, List, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useUnreviewedUsersFetch from "../../../hooks/useUnreviewedUsersFetch";
import UnreviewedUser from "./unreviewed-user/UnreviewedUser";

export default function ReviewUsers() {
  const { data, error, loading } = useUnreviewedUsersFetch();
  const [users, setUsers] = useState<object[]>();

  useEffect(() => {
    if (data !== undefined) setUsers(data);
  }, [data]);

  return (
    <div className="review-users-page">
      <List className="review-users-list">
        {users && users.length > 0 ? (
          users?.map((user: any) => {
            return (
              <ListItem color="white" key={user._id}>
                <UnreviewedUser user={user} />
              </ListItem>
            );
          })
        ) : (
          <Box p="2rem">No unreviewed users</Box>
        )}
      </List>
    </div>
  );
}
