import "./exit.css";
import NavBar from "../../../../components/navbar/NavBar";
import { useParams } from 'react-router-dom';
import { Heading } from "@chakra-ui/react";

function Exit() {
	const { exit } = useParams();

	console.log(exit)

  return (
    <div>
      <NavBar />
      <Heading as='h1'>{exit}</Heading>
    </div>
  );
}

export default Exit;
