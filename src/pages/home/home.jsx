import React, { Fragment } from "react";
import { Header } from "../../components";
import "./home.css";
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
