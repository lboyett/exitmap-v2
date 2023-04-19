import "./admin-home.css";
import { List, ListItem } from "@chakra-ui/react";
import { useNavigate, Outlet } from "react-router";

export default function AdminHome() {
  const navigate = useNavigate();
  return (
    <List className="admin-list">
      <ListItem onClick={() => navigate("/admin/review-exits")}>
        Review Exits
      </ListItem>
      <ListItem onClick={() => navigate("/admin/review-users")}>
        Review Users
      </ListItem>
    </List>
  );
}
