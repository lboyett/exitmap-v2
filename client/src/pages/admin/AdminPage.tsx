import NavBar from "../../components/navbar/NavBar";
import "./admin-page.css";
import { useNavigate, Outlet } from "react-router";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect } from "react";

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    if (!user.is_admin) navigate("/home");
  });

  return (
    <div className="contact-us">
      <NavBar currentPage="admin" />
      <Outlet />
    </div>
  );
}
