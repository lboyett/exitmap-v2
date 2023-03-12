import { Image, Flex } from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import "./exit-images.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectFlip, Pagination, Navigation } from "swiper";

export interface imgArrType {
  exit: number;
  is_deleted: boolean;
  is_main: boolean;
  submitted_by: number;
  url: string;
  key: string;
  _id: number;
}

interface ExitImagesPropTypes {
  imgArr: imgArrType[] | undefined;
  class: string;
}

function ExitImages(props: ExitImagesPropTypes) {
  const [imgState, setImgState] = useState<string[]>();

  useEffect(() => {
    let imagesArray: string[] = [];
    if (props.imgArr) {
      props.imgArr.forEach((image) => {
        const url = `https://ik.imagekit.io/lboyett/${image.key}?tr=w-600`;
        imagesArray.push(url);
      });
      setImgState(imagesArray);
    }
  }, []);

  if (!imgState) {
    return <></>;
  } else {
    return (
      <div className={`exit-images-container-${props.class}`}>
        <Swiper
          effect={"slide"}
          grabCursor={true}
          pagination={true}
          navigation={true}
          modules={[Pagination, Navigation]} // Add EffectFlip to this for a different effect
          className="mySwiper"
        >
          {imgState.map((image: string, i: number) => {
            console.log("Image loaded")
            return (
              <SwiperSlide key={i} className="swiper-slide">
                <img src={image} decoding="async" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }
}

export default ExitImages;
