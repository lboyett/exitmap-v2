import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Domain() {
	const [userContext] = useContext(UserContext)
	const navigate = useNavigate();
useEffect(() => {
	console.log(userContext)
	navigate("/home");
}, [userContext]);

	return ( <div className="domain">Domain</div> );
}

export default Domain;