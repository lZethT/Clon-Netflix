import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Featured } from "../../components/featured/Featured";
import movieData from "../../mocks/mock.json";
import { KidsShows } from "../../components/list/List";
import "./kids.scss";

export const Kids = () => {
  return (
    <main className="kids">
      <Navbar />
      <Featured movieData={movieData} page={"kids"} genre={"Infantil"} />
      <KidsShows movieData={movieData} />
    </main>
  );
};
