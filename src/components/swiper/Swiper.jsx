// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/scss/navigation";

// Import Swiper styles
import "swiper/css";
import "./swiper.scss";
import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import YoutubePlayer from "react-player/youtube";

export const Slider = ({ movieData, listType, page, genre }) => {
  const [hoveredItems, setHoveredItems] = useState({});

  const handleMouseEnter = (index) => {
    setHoveredItems((prevHoveredItems) => ({
      ...prevHoveredItems,
      [index]: true,
    }));
  };

  const handleMouseLeave = (index) => {
    setHoveredItems((prevHoveredItems) => ({
      ...prevHoveredItems,
      [index]: false,
    }));
  };

  switch (page) {
    case "home":
      return (
        <GetLists
          movieData={movieData}
          listType={listType}
          hoveredItems={hoveredItems}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      );
    case "movies":
      if (genre !== undefined) {
        return (
          <GetByGenre
            movieData={movieData}
            hoveredItems={hoveredItems}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            genre={genre}
            page={page}
          />
        );
      } else {
        return (
          <GetMovieLists
            movieData={movieData}
            listType={listType}
            hoveredItems={hoveredItems}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        );
      }
    case "series":
      if (genre !== undefined) {
        return (
          <GetByGenre
            movieData={movieData}
            hoveredItems={hoveredItems}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            genre={genre}
            page={page}
          />
        );
      } else {
        return (
          <GetSeriesLists
            movieData={movieData}
            listType={listType}
            hoveredItems={hoveredItems}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        );
      }
    case "kids":
      return (
        <GetKidList
          movieData={movieData}
          listType={listType}
          hoveredItems={hoveredItems}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      );
    default:
      <h1>404 not found</h1>;
      break;
  }

  return;
};

//Obtiene las listas de la home page
const GetLists = ({
  movieData,
  listType,
  hoveredItems,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  //Se usa el useMemo para evitar que se obtengan otros elementos aleatorios mientras se explora la página
  const list = useMemo(() => {
    const getRandomObjectsFromArray = (objectList, numObjects) => {
      let movies;

      switch (listType) {
        case "acclaimed":
          movies = objectList.filter((item) => item.acclaimed === true);
          break;
        case "movie":
          movies = objectList.filter((item) => item.type === "movie");
          break;
        case "serie":
          movies = objectList.filter((item) => item.type === "serie");
          break;
        default:
          movies = objectList;
          break;
      }

      const randomObjects = movies.slice(0, numObjects);

      return randomObjects.length > 0
        ? randomObjects
        : [
            {
              id: "no-results",
              info: { description: "No se encontraron resultados." },
            },
          ];
    };

    return getRandomObjectsFromArray(movieData.catalogue, 10);
  }, [movieData.catalogue, listType]);

  return (
    <SwiperComponent
      list={list}
      hoveredItems={hoveredItems}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
    />
  );
};

//Obtiene las listas de la página de películas sin filtro de genero
const GetMovieLists = ({
  movieData,
  listType,
  hoveredItems,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const list = useMemo(() => {
    const getRandomObjectsFromArray = (objectList, numObjects) => {
      let movies;
      let date = parseInt(new Date().getFullYear());

      switch (listType) {
        case "acclaimed":
          movies = objectList.filter(
            (item) => item.acclaimed === true && item.type === "movie"
          );
          break;
        case "popular":
          movies = objectList.filter(
            (item) => item.popular === true && item.type === "movie"
          );
          break;
        case "family":
          movies = objectList.filter(
            (item) =>
              (item.info.limit === "TV-Y" ||
                item.info.limit === "TV-Y7" ||
                item.info.limit === "TV-Y" ||
                item.info.limit === "G" ||
                item.info.limit === "TV-G" ||
                item.info.limit === "PG" ||
                item.info.limit === "TV-PG") &&
              item.type === "movie"
          );
          break;
        case "lastYear":
          movies = objectList.filter(
            (item) =>
              (parseInt(item.info.year) === date ||
                parseInt(item.info.year) === date - 1) &&
              item.type === "movie"
          );
          break;
        default:
          movies = objectList;
          break;
      }

      const randomObjects = movies.slice(0, numObjects);

      return randomObjects.length > 0
        ? randomObjects
        : [
            {
              id: "no-results",
              info: { description: "No se encontraron resultados." },
            },
          ];
    };

    return getRandomObjectsFromArray(movieData.catalogue, 10);
  }, [movieData.catalogue, listType]);

  return (
    <SwiperComponent
      list={list}
      hoveredItems={hoveredItems}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
    />
  );
};

//Obtiene las listas de la página de series sin filtros de genero
const GetSeriesLists = ({
  movieData,
  listType,
  hoveredItems,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  //Se usa el useMemo para evitar que se obtengan otros elementos aleatorios mientras se explora la página
  const list = useMemo(() => {
    const getRandomObjectsFromArray = (objectList, numObjects) => {
      let movies;
      let date = parseInt(new Date().getFullYear());

      switch (listType) {
        case "acclaimed":
          movies = objectList.filter(
            (item) => item.acclaimed === true && item.type === "serie"
          );
          break;
        case "popular":
          movies = objectList.filter(
            (item) => item.popular === true && item.type === "serie"
          );
          break;
        case "family":
          movies = objectList.filter(
            (item) =>
              (item.info.limit === "TV-Y" ||
                item.info.limit === "TV-Y7" ||
                item.info.limit === "TV-Y" ||
                item.info.limit === "G" ||
                item.info.limit === "TV-G" ||
                item.info.limit === "PG" ||
                item.info.limit === "TV-PG") &&
              item.type === "serie"
          );
          break;
        case "anime":
          movies = objectList.filter(
            (item) => item.info.genre === "Animes" && item.type === "serie"
          );
          break;
        case "lastYear":
          movies = objectList.filter(
            (item) =>
              (parseInt(item.info.year) === date ||
                parseInt(item.info.year) === date - 1) &&
              item.type === "serie"
          );
          break;
        default:
          movies = objectList;
          break;
      }

      const randomObjects = movies.slice(0, numObjects);

      return randomObjects.length > 0
        ? randomObjects
        : [
            {
              id: "no-results",
              info: { description: "No se encontraron resultados." },
            },
          ];
    };

    return getRandomObjectsFromArray(movieData.catalogue, 10);
  }, [movieData.catalogue, listType]);

  return (
    <SwiperComponent
      list={list}
      hoveredItems={hoveredItems}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
    />
  );
};

//Obtiene las listas de la página de niños
const GetKidList = ({
  movieData,
  listType,
  hoveredItems,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  //Se usa el useMemo para evitar que se obtengan otros elementos aleatorios mientras se explora la página
  const list = useMemo(() => {
    const getRandomObjectsFromArray = (objectList, numObjects) => {
      let movies;

      switch (listType) {
        case "popular":
          movies = objectList.filter(
            (item) => item.popular === true && item.info.genre === "Infantil"
          );
          break;
        case "movies":
          movies = objectList.filter(
            (item) => item.type === "movie" && item.info.genre === "Infantil"
          );
          break;
        case "series":
          movies = objectList.filter(
            (item) => item.type === "serie" && item.info.genre === "Infantil"
          );
          break;
        default:
          movies = objectList;
          break;
      }

      const randomObjects = movies.slice(0, numObjects);

      return randomObjects.length > 0
        ? randomObjects
        : [
            {
              id: "no-results",
              info: { description: "No se encontraron resultados." },
            },
          ];
    };

    return getRandomObjectsFromArray(movieData.catalogue, 10);
  }, [movieData.catalogue, listType]);

  return (
    <SwiperComponent
      list={list}
      hoveredItems={hoveredItems}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
    />
  );
};

//Obtiene los elementos filtrados por genero de serie o película
export const GetByGenre = ({
  movieData,
  hoveredItems,
  handleMouseEnter,
  handleMouseLeave,
  genre,
  page,
}) => {
  //Se usa el useMemo para evitar que se obtengan otros elementos aleatorios mientras se explora la página
  const list = useMemo(() => {
    const getRandomObjectsFromArray = (objectList, numObjects) => {
      let movies;

      if (page === "movies") {
        switch (genre) {
          case "Acción":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "movie"
            );
            break;
          case "Romances":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "movie"
            );
            break;
          case "Dramas":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "movie"
            );
            break;
          case "Infantil":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "movie"
            );
            break;
          case "Comedia":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "movie"
            );
            break;
          case "De intriga":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "movie"
            );
            break;
          case "Terror":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "movie"
            );
            break;
          case "Sci-fi":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "movie"
            );
            break;
          case "Animes":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "movie"
            );
            break;
          case "Fantasía":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "movie"
            );
            break;
          default:
            <h1>No hay objetos con ese genero</h1>;
            break;
        }
      }

      if (page === "series") {
        switch (genre) {
          case "Acción":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "serie"
            );
            break;
          case "Romances":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "serie"
            );
            break;
          case "Dramas":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "serie"
            );
            break;
          case "Infantil":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "serie"
            );
            break;
          case "Comedia":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "serie"
            );
            break;
          case "De intriga":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "serie"
            );
            break;
          case "Terror":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "serie"
            );
            break;
          case "Sci-fi":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "serie"
            );
            break;
          case "Animes":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "serie"
            );
            break;
          case "Fantasía":
            movies = objectList.filter(
              (item) => item.info.genre === genre && item.type === "serie"
            );
            break;
          default:
            <h1>No hay objetos con ese genero</h1>;
            break;
        }
      }

      const randomObjects = movies.slice(0, numObjects);

      return randomObjects.length > 0
        ? randomObjects
        : [
            {
              id: "no-results",
              info: { description: "No se encontraron resultados." },
            },
          ];
    };

    return getRandomObjectsFromArray(movieData.catalogue, 10);
  }, [movieData.catalogue, genre, page]);

  return list?.map((item, index) =>
    item.id === "no-results" ? (
      <div className="item-content no-results">{item.info.description}</div>
    ) : (
      <div className="item-content">
        <div
          className="image-container"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <div className="idunno">
            {hoveredItems[index] ? (
              <Link to={`/Watch/${encodeURIComponent(item.info.trailer)}`}>
                <YoutubePlayer
                  className="back"
                  url={item.info.trailer}
                  muted
                  loop
                  playing={true}
                  width={"100%"}
                  height={"100%"}
                />
              </Link>
            ) : (
              <img src={item.info.thumbnail} alt={item.title} />
            )}
            <section className="info-container">
              <div className="icons">
                <Link to={`/Watch/${encodeURIComponent(item.info.trailer)}`}>
                  <PlayArrow className="icon" />
                </Link>
                <Add className="icon" />
                <ThumbUpOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="movie-info">
                <span>{item.info.year}</span>
                <span className="limit">{item.info.limit}</span>
                <span>{item.info.duration}</span>
              </div>
              <div className="movie-desc">
                <span>{item.info.description}</span>
              </div>
              <div className="genre">
                <span> {item.info.genre}</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  );
};

//Es el componente el cual crea las listas usando la biblioteca Swiper js
const SwiperComponent = ({
  list,
  handleMouseEnter,
  handleMouseLeave,
  hoveredItems,
}) => {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      //responsive
      breakpoints={{
        200: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        600: {
          slidesPerView: 4,
          spaceBetween: 5,
        },
        1001: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      }}
    >
      {list?.map((item, index) => (
        <SwiperSlide key={item.id}>
          {item.id === "no-results" ? (
            <div className="slide-content no-results">
              {item.info.description}
            </div>
          ) : (
            <div className="slide-content">
              <div
                className="image-container"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {hoveredItems[index] ? (
                  <Link to={`/Watch/${encodeURIComponent(item.info.trailer)}`}>
                    <YoutubePlayer
                      className="back"
                      url={item.info.trailer}
                      muted
                      loop
                      playing={true}
                      width={"100%"}
                      height={"100%"}
                    />
                  </Link>
                ) : (
                  <img src={item.info.thumbnail} alt="thumbnail" />
                )}
                <div className="icons">
                  <Link to={`/Watch/${encodeURIComponent(item.info.trailer)}`}>
                    <PlayArrow className="icon" />
                  </Link>
                  <Add className="icon" />
                  <ThumbUpOutlined className="icon" />
                  <ThumbDownOutlined className="icon" />
                </div>
                <div className="movie-info">
                  <span>{item.info.year}</span>
                  <span className="limit">{item.info.limit}</span>
                  <span>{item.info.duration}</span>
                </div>
                <div className="movie-desc">
                  <span>{item.info.description}</span>
                </div>
                <div className="genre">
                  <span> {item.info.genre}</span>
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
