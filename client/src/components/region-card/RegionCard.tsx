import { ListItem, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import "./region-card.css";

interface RegionCardProps {
  region: string;
  filterJumpsByRegion: Function;
}

export default function RegionCard({
  region,
  filterJumpsByRegion,
}: RegionCardProps) {
  const bg_500 = useColorModeValue("bg_light.500", "bg_dark.500");
  const txt_300 = useColorModeValue("txt_light.300", "txt_dark.300");

  function handleClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    filterJumpsByRegion((e.target as HTMLDivElement).innerHTML);
  }

  return (
    <ListItem
      className="region"
      background={bg_500}
      border="1px solid"
      key={region}
      _hover={{ color: txt_300, cursor: "pointer" }}
      onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
        handleClick(e)
      }
    >
      {region}
    </ListItem>
  );
}
