import { Image, Flex } from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import "./exit-images.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectFlip, Pagination, Navigation } from "swiper";

function ExitImages(props: any) {
  const [imgState, setImgState] = useState<string[]>();

  useEffect(() => {
    let imagesArray: string[] = [];
    if (props.imgArr) {
      props.imgArr.forEach((image: any) => {
        imagesArray.push(image.url);
      });
      setImgState([...imagesArray]);
    }
  }, []);

  useEffect(() => {
    console.log(imgState);
  }, [imgState]);

  return (
    <div className={`exit-images-container-${props.class}`}>
      {imgState ? <div>THIS SHIT WORKS</div> : <div>returns null</div>}
    </div>
  );
}

export default ExitImages;
