import React, { useState } from "react";
import "./frontpage.scss";
import {
  Add,
  CancelOutlined,
  Download,
  NavigateNext,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Frontpage = () => {
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();

  const navigate = useNavigate();

  const accordionInfo = [
    {
      title: "¿Qué es Netflix?",
      content:
        "Netflix es un servicio de streaming que ofrece una gran variedad de películas, series y documentales premiados en casi cualquier pantalla conectada a internet. Todo lo que quieras ver, a un costo mensual muy accesible. Siempre hay algo nuevo por descubrir, ¡y todas las semanas se agregan más películas y series!",
    },
    {
      title: "¿Cuánto cuesta Netflix?",
      content:
        "Disfruta Netflix en tu smartphone, tablet, smart TV, laptop o dispositivo de streaming, todo por una tarifa plana mensual. Planes desde $99 hasta $299 al mes. Sin costos adicionales ni contratos.",
    },
    {
      title: "¿Dónde puedo ver Netflix?",
      content:
        "Disfruta donde quieras, cuando quieras. Inicia sesión en tu cuenta de Netflix para ver contenido al instante a través de netflix.com desde tu computadora personal o en cualquier dispositivo con conexión a internet que cuente con la app de Netflix, como smart TV, smartphones, tablets, reproductores multimedia y consolas de juegos. Además, puedes descargar tus series favoritas con iOS, Android o la app para Windows 10. Con la función de descarga, puedes ver donde vayas y sin conexión a internet. Lleva Netflix contigo adonde sea.",
    },
    {
      title: "¿Cómo cancelo?",
      content:
        "Netflix es flexible. Sin contratos molestos ni compromisos. Cancela la membresía online con solo dos clics. No hay cargos por cancelación. Empieza y termina cuando quieras.",
    },
    {
      title: "¿Qué puedo ver en Netflix?",
      content:
        "Netflix tiene un amplio catálogo de películas, series, documentales, animes, originales premiados y más. Todo lo que quieras ver, cuando quieras.",
    },
    {
      title: "¿Es bueno Netflix para los niños?",
      content:
        "La experiencia de Netflix para niños está incluida en la membresía para que los padres tengan el control mientras los peques disfrutan series y películas familiares en su propio espacio. Los perfiles para niños incluyen controles parentales protegidos por PIN que te permiten restringir el contenido que pueden ver los niños en función de la clasificación por edad y bloquear determinados títulos que no quieras que los niños vean.",
    },
  ];

  const onSubmit1 = handleSubmit1((data) => {
    navigate(`/signup/${data.email.toLowerCase()}`);
  });

  const onSubmit2 = handleSubmit2((data) => {
    navigate(`/signup/${data.email2.toLowerCase()}`);
  });

  const AccordionItem = ({ accordionInfo }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
      setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return accordionInfo?.map((item, index) => (
      <div className="accordion-item" key={index}>
        <button
          className={
            openIndex === index ? "btn-accordion open" : "btn-accordion"
          }
          onClick={() => toggleAccordion(index)}
        >
          <h3 className="accordion-title">{item.title}</h3>
          <span>
            <Add className="cross" />
          </span>
        </button>
        <div
          className={
            openIndex === index ? "accordion-content open" : "accordion-content"
          }
        >
          {item.content}
        </div>
      </div>
    ));
  };

  return (
    <>
      <header className="header">
        <div className="wrapper">
          <div className="container">
            <div className="left-item">
              <picture className="netflix-icon">
                <source
                  srcSet="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                  media="(min-width: 600px)"
                />
                <source
                  srcSet="https://seeklogo.com/images/N/netflix-logo-6A5D357DF8-seeklogo.com.png"
                  media="(max-width: 599px)"
                />
                <img alt="netflix-icon" />
              </picture>
            </div>
            <div className="right-item">
              <Link to={"/Login"} className="log-in">
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="main">
        <div className="netflix">
          <div className="front">
            <div className="content">
              <h1 className="title">
                Películas y series ilimitadas y mucho más
              </h1>
              <p className="text">
                Disfruta donde quieras. Cancela cuando quieras.
              </p>
              <div className="sign-up">
                <form onSubmit={onSubmit1} className="mail" noValidate>
                  <h3 className="desc">
                    ¿Quieres ver Netflix ya? Ingresa tu email para crear una
                    cuenta o reiniciar tu membresía de Netflix.
                  </h3>
                  <div className="input-container">
                    <div className="input">
                      <input
                        {...register1("email", {
                          required: "Correo es requerido",
                          minLength: {
                            value: 4,
                            message: "Minimo de 4 caracteres",
                          },
                          pattern: {
                            value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                            message: "Correo no valido",
                          },
                        })}
                        required
                        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                        id="mail"
                        type="email"
                        className={errors1.email ? "mail invalid" : "mail"}
                        autoComplete="off"
                        placeholder=" "
                      />
                      <label htmlFor="mail" className="input-label">
                        Email
                      </label>
                      {errors1.email && (
                        <>
                          <CancelOutlined className="icon" />
                          <span>{errors1.email?.message}</span>
                        </>
                      )}
                    </div>
                    <button htmlFor="email1" className="btn-start">
                      Comenzar <NavigateNext />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="background">
            <div className="back-gradiant"></div>
            <img
              src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2e412267-407c-4ca9-aaa3-bde15548a2fb/MX-es-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg"
              className="background-img"
              alt="netflix-background"
            />
          </div>
        </div>
        <section className="enjoy-tv">
          <div className="tv-container">
            <div className="text-container">
              <h2>Disfruta en tu TV</h2>
              <p>
                Ve en smart TV, PlayStation, Xbox, Chromecast, Apple TV,
                reproductores de Blu-ray y más.
              </p>
            </div>
            <div className="animation-container">
              <div className="tv">
                <img
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
                  alt="tv"
                />
                <div className="video">
                  <video
                    autoPlay
                    playsInline
                    muted
                    loop
                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="platforms">
          <div className="platforms-container">
            <div className="animation">
              <div className="screen">
                <img
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
                  alt=""
                />
                <div className="video2">
                  <video
                    autoPlay
                    playsInline
                    muted
                    loop
                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v"
                  />
                </div>
              </div>
            </div>
            <div className="text-container">
              <h2>Disfruta donde quieras</h2>
              <p>
                Películas y series ilimitadas en tu teléfono, tablet, laptop y
                TV.
              </p>
            </div>
          </div>
        </section>
        <section className="kidsProfile">
          <div className="kids-container">
            <div className="text-container">
              <h2>Crea perfiles para niños</h2>
              <p>
                Los niños vivirán aventuras con sus personajes favoritos en un
                espacio diseñado exclusivamente para ellos, sin costo con tu
                membresía.
              </p>
            </div>
            <div className="img-container">
              <img
                className="netflixKids"
                src="https://occ-0-5175-37.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABS2wPb0M8BZZsg7maAVHhc1rfAZm9RWMpYfL95TcWCTiT1OvZGx4qg2NVvAtqK_AONqNNWbJYzdgVvbgrQGgag-qgYnKEi2RKM9A.png?r=25d"
                alt="kidsProfile"
              />
            </div>
          </div>
        </section>
        <section className="downloads">
          <div className="downloads-container">
            <div className="img-container">
              <img
                className="mobile"
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
                alt="downloads"
              />
              <div className="card-container">
                <div className="icon">
                  <img
                    className="movie-icon"
                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
                    alt="movie-icon"
                  />
                </div>
                <div className="text">
                  <p className="title">Stranger Things</p>
                  <p className="desc">Descargando...</p>
                </div>
                <div className="btn-download">
                  <Download />
                </div>
              </div>
            </div>
            <div className="text-container">
              <h2>Descarga tus series para verlas offline</h2>
              <p>Ve Netflix en un avión, un tren o un submarino...</p>
            </div>
          </div>
        </section>
        <section className="questions">
          <div className="accordion-container">
            <h2>Preguntas frecuentes</h2>
            <AccordionItem accordionInfo={accordionInfo} />
          </div>
          <form onSubmit={onSubmit2} className="mail2" noValidate>
            <h3 className="desc">
              ¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o
              reiniciar tu membresía de Netflix.
            </h3>
            <div className="input-container2">
              <div className="input2">
                <input
                  {...register2("email2", {
                    required: "Correo es requerido",
                    minLength: {
                      value: 4,
                      message: "Minimo de 4 caracteres",
                    },
                    pattern: {
                      value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                      message: "Correo no valido",
                    },
                  })}
                  required
                  pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                  type="email"
                  className={errors2.email2 ? "mail2 invalid" : "mail2"}
                  autoComplete="off"
                  placeholder=" "
                  id="mail2"
                />
                <label htmlFor="mail2" className="input-label2">
                  Email
                </label>
                {errors2.email2 && (
                  <>
                    <CancelOutlined className="icon2" />
                    <span>{errors2.email2?.message}</span>
                  </>
                )}
              </div>
              <button htmlFor="mail2" className="btn-start2">
                Comenzar <NavigateNext />
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};
