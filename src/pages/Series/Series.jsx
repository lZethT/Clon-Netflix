import React, { useState } from "react";
import "./series.scss";
import Navbar from "../../components/navbar/Navbar";
import { Featured } from "../../components/featured/Featured";
import { SeriesList, ShowByGenre } from "../../components/list/List";
import movieData from "../../mocks/mock.json";

export const Series = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <header className="series">
      <Navbar isScrolled={isScrolled} setIsScrolled={setIsScrolled} />
      <Featured
        isScrolled={isScrolled}
        movieData={movieData}
        page={"series"}
        genre={selectedGenre}
      />
      <section className="serie-data">
        <div className="title">
          <h1>Series</h1>
        </div>
        <div className="synopsis">
          El apodo de pantalla chica no le queda más. Desde sitcoms y dramas
          hasta viajes y entrevistas, estas son las series más grandes de la TV.
        </div>
        <div className="genre-selector">
          <label For="genre-select" className="genre label">
            Buscar por Genero:
          </label>
          <select
            name="genres"
            id="genre-select"
            className="genre"
            value={selectedGenre}
            onChange={handleChange}
          >
            <option value={""}>Seleccione un género</option>
            <option value={"Acción"}>Acción</option>
            <option value={"Romances"}>Romanticas</option>
            <option value={"Dramas"}>Dramas</option>
            <option value={"Infantil"}>Infantil</option>
            <option value={"Comedia"}>Comedia</option>
            <option value={"De intriga"}>De intriga</option>
            <option value={"Terror"}>Terror</option>
            <option value={"Sci-fi"}>Sci-fi</option>
            <option value={"Animes"}>Animes</option>
            <option value={"Fantasía"}>Fantasía</option>
          </select>
        </div>
      </section>
      {selectedGenre === "" ? (
        <SeriesList movieData={movieData} />
      ) : (
        <ShowByGenre
          movieData={movieData}
          genre={selectedGenre}
          page={"series"}
        />
      )}
    </header>
  );
};
