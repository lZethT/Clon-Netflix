import { Featured } from "../../components/featured/Featured";
import { HomeLists } from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import movieData from "../../mocks/mock.json";
import "./home.scss";
import React from "react";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Featured movieData={movieData} />
      <HomeLists movieData={movieData} />
    </div>
  );
};

export default Home;
