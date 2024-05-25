import React from "react";
import "./watch.scss";
import { ArrowBack } from "@mui/icons-material";
import YoutubePlayer from "react-player/youtube";
import { Link, useParams } from "react-router-dom";
import { NotFound } from "../NotFound/NotFound";

export const Watch = () => {
  const { url } = useParams();
  const decodedUrl = decodeURIComponent(url);

  return (
    <div className="watch">
      <Link to={"/Home"}>
        <div className="back">
          <ArrowBack className="icon" />
          Inicio
        </div>
      </Link>
      <YTResponse decodedUrl={decodedUrl} />
    </div>
  );
};

const YTResponse = ({ decodedUrl }) => {
  const canPlay = YoutubePlayer.canPlay(decodedUrl);

  return (
    <>
      {canPlay ? (
        <YoutubePlayer
          url={decodedUrl}
          playing={true}
          width={"100%"}
          height={"100%"}
          controls
        />
      ) : (
        <NotFound />
      )}
    </>
  );
};
