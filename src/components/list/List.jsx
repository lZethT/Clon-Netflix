import "./list.scss";
import React from "react";
import { Slider } from "../swiper/Swiper";

export const HomeLists = ({ movieData }) => {
  return (
    <>
      <div className="list">
        <span className="listTitle">Aclamadas por las criticas</span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider
              movieData={movieData}
              listType={"acclaimed"}
              page={"home"}
            />
          </div>
        </div>
      </div>
      <div className="list">
        <span className="listTitle">Series</span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider movieData={movieData} listType={"serie"} page={"home"} />
          </div>
        </div>
      </div>
      <div className="list">
        <span className="listTitle">Películas</span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider movieData={movieData} listType={"movie"} page={"home"} />
          </div>
        </div>
      </div>
    </>
  );
};

export const MovieLists = ({ movieData }) => {
  return (
    <>
      <div className="list">
        <span className="listTitle">Aclamadas por las criticas</span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider
              movieData={movieData}
              listType={"acclaimed"}
              page={"movies"}
            />
          </div>
        </div>
      </div>
      <div className="list">
        <span className="listTitle">Películas populares</span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider
              movieData={movieData}
              listType={"popular"}
              page={"movies"}
            />
          </div>
        </div>
      </div>
      <div className="list">
        <span className="listTitle">
          Películas para ver con toda la familia
        </span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider movieData={movieData} listType={"family"} page={"movies"} />
          </div>
        </div>
      </div>
      <div className="list">
        <span className="listTitle">Lanzamientos del último año</span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider
              movieData={movieData}
              listType={"lastYear"}
              page={"movies"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const SeriesList = ({ movieData }) => {
  return (
    <>
      <div className="list">
        <span className="listTitle">Aclamadas por las criticas</span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider
              movieData={movieData}
              listType={"acclaimed"}
              page={"series"}
            />
          </div>
        </div>
      </div>
      <div className="list">
        <span className="listTitle">Series populares</span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider
              movieData={movieData}
              listType={"popular"}
              page={"series"}
            />
          </div>
        </div>
      </div>
      <div className="list">
        <span className="listTitle">Series para ver en familia</span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider movieData={movieData} listType={"family"} page={"series"} />
          </div>
        </div>
      </div>
      <div className="list">
        <span className="listTitle">Animes</span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider movieData={movieData} listType={"anime"} page={"series"} />
          </div>
        </div>
      </div>
      <div className="list">
        <span className="listTitle">Lanzamientos del último año</span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider
              movieData={movieData}
              listType={"lastYear"}
              page={"series"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const KidsShows = ({ movieData }) => {
  return (
    <>
      <div className="list">
        <span className="listTitle">Populares</span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider movieData={movieData} listType={"popular"} page={"kids"} />
          </div>
        </div>
      </div>
      <div className="list">
        <span className="listTitle">Películas</span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider movieData={movieData} listType={"movies"} page={"kids"} />
          </div>
        </div>
      </div>
      <div className="list">
        <span className="listTitle">Series</span>
        <div className="wrapper">
          <div className="wrapper__container">
            <Slider movieData={movieData} listType={"series"} page={"kids"} />
          </div>
        </div>
      </div>
    </>
  );
};

export const ShowByGenre = ({ movieData, genre, page }) => {
  return (
    <main className="genre-list">
      <section className="genre-list__wrapper-genre">
        <div className="wrapper-genre__container">
          <Slider movieData={movieData} genre={genre} page={page} />
        </div>
      </section>
    </main>
  );
};
