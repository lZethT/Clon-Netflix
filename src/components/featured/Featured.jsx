import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import "./featured.scss";
import React, { useEffect, useState, useMemo, useContext } from "react";
import YoutubePlayer from "react-player/youtube";
import { Link } from "react-router-dom";
import { ScrollContext } from "../contexts/ScrollContext";

export const Featured = ({ movieData, page, genre }) => {
  const [autoPlay, setAutoPlay] = useState(false);
  const { isScrolled } = useContext(ScrollContext);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (!isScrolled) {
        setAutoPlay(true);
      }
    }, 2000);

    return () => clearTimeout(timeOut);
  }, [isScrolled]);

  const handlePlay = () => {
    setAutoPlay(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handlePlay);

    return () => {
      window.removeEventListener("scroll", handlePlay);
    };
  }, []);

  return (
    <div className="featured">
      <GetFeatured
        movieData={movieData}
        autoPlay={autoPlay}
        page={page}
        genre={genre}
      />
    </div>
  );
};

const GetFeatured = ({ movieData, autoPlay, page, genre }) => {
  const randomFeatured = useMemo(() => {
    let featured;
    switch (page) {
      case "movies":
        if (genre !== undefined && genre !== "") {
          featured = movieData.catalogue.filter(
            (item) =>
              item.featured === true &&
              item.type === "movie" &&
              item.info.genre === genre
          );
        } else {
          featured = movieData.catalogue.filter(
            (item) => item.featured === true && item.type === "movie"
          );
        }
        break;
      case "series":
        if (genre !== undefined && genre !== "") {
          featured = movieData.catalogue.filter(
            (item) =>
              item.featured === true &&
              item.type === "serie" &&
              item.info.genre === genre
          );
        } else {
          featured = movieData.catalogue.filter(
            (item) => item.featured === true && item.type === "serie"
          );
        }
        break;
      case "kids":
        featured = movieData.catalogue.filter(
          (item) => item.featured === true && item.info.genre === genre
        );
        break;
      default:
        featured = movieData.catalogue.filter((item) => item.featured === true);
        break;
    }
    const randomIndex = Math.floor(Math.random() * featured.length);

    if (featured.length === 0) {
      return undefined;
    } else {
      return featured[randomIndex];
    }
  }, [movieData, page, genre]);

  return (
    <>
      <div className="poster-container">
        {randomFeatured === undefined ? (
          <picture className="posters">
            <source
              srcSet={
                "https://wallpapers-clan.com/wp-content/uploads/2023/12/aesthetic-pingu-meme-desktop-wallpaper-preview.jpg"
              }
            />
            <img className="poster" alt="eh?" />
          </picture>
        ) : (
          <>
            {autoPlay ? (
              <YoutubePlayer
                url={randomFeatured.info.trailer}
                muted
                loop
                playing={true}
                width={"100%"}
                height={"100%"}
              />
            ) : (
              <picture className="posters">
                <source
                  srcSet={randomFeatured.info.poster}
                  media="(min-width: 600px)"
                />
                <source
                  srcSet={randomFeatured.info.poster2}
                  media="(max-width: 599px)"
                />
                <img className="poster" alt={randomFeatured.title} />
              </picture>
            )}
          </>
        )}
      </div>
      <div className="info">
        {randomFeatured === undefined ? (
          <>
            <div className="desc-container">
              <span className="desc">No hay resultados</span>
            </div>
          </>
        ) : (
          <>
            <div className="logo-container">
              <img
                className="logo"
                src={randomFeatured.info.logo}
                alt={randomFeatured.title}
              />
            </div>
            <div className="desc-container">
              <span className="desc">{randomFeatured.info.description}</span>
            </div>
            <div className="title-info">
              <span className="title-year">{randomFeatured.info.year}</span>
              <span className="info-spacer"> | </span>
              <span className="title-limit">{randomFeatured.info.limit}</span>
              <span className="info-spacer"> | </span>
              <span className="title-duration">
                {randomFeatured.info.duration}
              </span>
              <span className="info-spacer"> | </span>
              <span className="title-genre">{randomFeatured.info.genre}</span>
            </div>
            <div className="buttons">
              <Link
                to={`/Watch/${encodeURIComponent(randomFeatured.info.trailer)}`}
              >
                <button className="play">
                  <PlayArrow />
                  <span>Ver</span>
                </button>
              </Link>
              <button className="more">
                <InfoOutlined />
                <span>Info</span>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
