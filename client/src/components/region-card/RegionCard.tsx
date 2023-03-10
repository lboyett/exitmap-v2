import { ListItem, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";

import "./region-card.css";

interface RegionCardProps {
  region: string;
  activateRegion: Function;
  isActive: boolean;
}

export default function RegionCard({
  region,
  activateRegion,
  isActive,
}: RegionCardProps) {
  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");

  function handleClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    activateRegion((e.target as HTMLLIElement).innerHTML);
  }

  return (
    <ListItem
      className="region"
      background={bg_500}
      border="1px solid"
      key={region}
      _hover={{ color: txt_300, cursor: "pointer" }}
      boxShadow={isActive ? "0 0 10px" : ""}
      color={isActive ? txt_300 : ""}
      onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
        handleClick(e)
      }
    >
      {region}
    </ListItem>
  );
}
