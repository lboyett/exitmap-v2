import { useParams } from "react-router-dom";
import NavBar from "../../../components/navbar/NavBar";

function Country() {
  let { country } = useParams();

  return (
    <div className="country">
      <NavBar currentPage="exits"/>
      <h1>{country}</h1>
    </div>
  );
}

export default Country;
