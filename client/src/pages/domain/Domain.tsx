import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useEffect } from "react";

function Domain() {
	const [userContext] = useContext(UserContext)
useEffect(() => {
	console.log(userContext)
}, [userContext]);

	return ( <div className="domain">Domain</div> );
}

export default Domain;