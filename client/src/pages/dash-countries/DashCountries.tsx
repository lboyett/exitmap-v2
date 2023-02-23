import NavBar from "../../components/navbar/NavBar";
import {
  Box,
  UnorderedList,
  ListItem,
  Text,
  Image,
  Heading,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import "./dash-countries.css";
import { countriesList } from "../../data/countries-data";
import countryImage from "../../assets/country-image.jpeg";

function DashCountries() {
  const lettersArr = [] as string[];
  for (let i = 65; i < 91; i++) {
    lettersArr.push(String.fromCharCode(i));
  }

  return (
    <div className="dash-countries">
      <NavBar currentPage="exits" />
      <Box className="content">
        <UnorderedList
          className="letter-bar"
          color="out.500"
          border="1px solid"
          background="bg.500"
        >
          {lettersArr.map((letter) => {
            return <ListItem key={letter}>{letter}</ListItem>;
          })}
        </UnorderedList>
        <UnorderedList className="country-list">
          {countriesList.map((country) => {
            return (
              <ListItem
                className="country-card"
                key={country.country}
                color="out.500"
                border="1px solid"
                _hover={{
                  borderColor: "txt.300",
                  color: "txt.300",
                }}
              >
                <Image src={countryImage} loading="lazy" />
                <Flex direction="column">
                  <Heading as="h4">{country.country}</Heading>
                  <Spacer />
                  <Flex>
                    <Text>{country.continent}</Text>
                    <Spacer />
                    <Text>3 jumps</Text>
                  </Flex>
                </Flex>
              </ListItem>
            );
          })}
        </UnorderedList>
      </Box>
    </div>
  );
}

export default DashCountries;
