import { ListItem, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

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
  const out_500 = useColorModeValue("out_light.500", "out_dark.500");
  const [active, setActive] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    if (active) {
      console.log("ran");
      setActive(false);
      return;
    }
    filterJumpsByRegion((e.target as HTMLDivElement).innerHTML);
    setActive(true);
  }

  useEffect(() => {
    console.log(active);
  }, [active]);

  return (
    <ListItem
      className="region"
      background={bg_500}
      border="1px solid"
      key={region}
      color={active ? txt_300 : out_500}
      _hover={{ color: txt_300, cursor: "pointer" }}
      onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
        handleClick(e)
      }
    >
      {region}
    </ListItem>
  );
}
