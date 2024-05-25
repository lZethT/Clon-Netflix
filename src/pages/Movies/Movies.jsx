import { Featured } from "../../components/featured/Featured";
import { MovieLists, ShowByGenre } from "../../components/list/List";
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import movieData from "../../mocks/mock.json";
import "./movies.scss";

export const Movies = () => {
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <header className="movies">
      <Navbar />
      <Featured movieData={movieData} page={"movies"} genre={selectedGenre} />
      <section className="movie-data">
        <div className="title">
          <h1>Películas</h1>
        </div>
        <div className="synopsis">
          Las películas nos movilizan más que cualquier otra cosa. De risa, de
          terror, de amor, o algo parecido, cada una nos deja una huella
          imborrable.
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
        <MovieLists movieData={movieData} />
      ) : (
        <ShowByGenre
          movieData={movieData}
          genre={selectedGenre}
          page={"movies"}
        />
      )}
    </header>
  );
};
