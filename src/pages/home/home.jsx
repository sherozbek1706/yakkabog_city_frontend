import React, { Fragment } from "react";
import { Header } from "../../components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";

import "./home.css";

import image1 from "../../images/slider/1.jpg";
import image2 from "../../images/slider/2.jpg";
import image3 from "../../images/slider/3.jpg";
import image4 from "../../images/slider/4.jpg";
export const Home = () => {
  const slider_data = [
    {
      url: image1,
      title: "YAKKABOG' CITY",
    },
    {
      url: image2,
      title: "ZAMONAVIY UYLAR",
    },
    {
      url: image14,
      title: "YAKKABOG' CITY",
    },
  ];

  return (
    <Fragment>
      <Header title={"ASOSIY SAHIFA"} />
    </Fragment>
  );
};
