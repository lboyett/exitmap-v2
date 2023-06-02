import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Domain() {
	const [userContext] = useContext(UserContext)
	const navigate = useNavigate();
useEffect(() => {
	console.log(userContext)
	navigate("/login");
}, [userContext]);

	return ( <div className="domain">ExitMap</div> );
}

export default Domain;