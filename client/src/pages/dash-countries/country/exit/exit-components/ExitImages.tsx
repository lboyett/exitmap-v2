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
  const [imgArr, setImgArr] = useState<string[]>();

  function makeImgArr(images: any){
    let arr = images.map((image: any) => {
      return image.url;
    })
    console.log(arr);
    setImgArr(arr);
  }

  if (props.images === undefined) {
    return <></>;
  } else {
    return (
      <div className={`exit-images-container-${props.class}`}>
        {/* <Swiper
          effect={"slide"}
          grabCursor={true}
          pagination={true}
          navigation={true}
          modules={[Pagination, Navigation]} // Add EffectFlip to this for a different effect
          className="mySwiper"
        >
          {imgArr.map((image: string, i: number) => {
            return (
              <SwiperSlide key={i} className="swiper-slide">
                <img src={image} />
              </SwiperSlide>
            );
          })}
        </Swiper> */}
      </div>
    );
  }
}
export default ExitImages;
