import React, { useContext, useEffect, useState } from "react";
import "./login.scss";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useIndexedDB } from "../../components/contexts/IDBContext";
import { UserContext } from "../../components/contexts/UserContext";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const [userFound, setUserFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { checkEmailExists } = useIndexedDB();
  const { setIsLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const { email, password } = JSON.parse(rememberedUser);
      reset({ email, password });
      setRememberMe(true);
    }
  }, [reset]);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogIn = (data) => {
    if (rememberMe) {
      localStorage.setItem("rememberedUser", JSON.stringify(data));
    } else {
      localStorage.removeItem("rememberedUser");
    }
    setUserFound(false);
    setIsLoggedIn(true);
    navigate("/Home");
  };

  const onSubmit = handleSubmit(async (data) => {
    let email = data.email.toLowerCase();
    let password = data.password;
    try {
      const result = await checkEmailExists(email, password, "login");
      if (!result.found) {
        setErrorMessage(
          <>
            No podemos encontrar una cuenta con esta dirección de email.
            Reinténtalo o{" "}
            <Link to={"/signup"} className="alerta">
              crea una cuenta nueva
            </Link>
          </>
        );
        setUserFound(true);
      } else if (result.found && !result.passwordCorrect) {
        setErrorMessage(
          <>
            <b>Contraseña incorrecta.</b> Reinténtalo o{" "}
            <Link to={"/signup"} className="alerta">
              restablece la contraseña.
            </Link>
          </>
        );
        setUserFound(true);
      } else {
        handleLogIn(data);
      }
    } catch (e) {
      setErrorMessage(
        <>
          "Surgio un problema al querer verificar el email, intentelo más
          tarde."
        </>
      );
      setUserFound(true);
    }
  });

  return (
    <>
      <header className="header-lg">
        <div className="header__wrapper">
          <div className="container">
            <Link to={"/"}>
              <div className="icon">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                  alt="netflixIcon"
                  className="NetflixIcon"
                />
              </div>
            </Link>
            <div className="fill"></div>
          </div>
        </div>
      </header>
      <div className="image__wrapper">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/8e2c5f12-179b-4395-b223-d4e36ac9bd5c/MX-es-20240219-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
          className="background"
        />
      </div>
      <main className="login-main">
        <section className="form__wrapper">
          <div className="form">
            <div className="form-data">
              <h1 className="form__title">Inicia sesión</h1>
              {userFound && (
                <div className="user-login">
                  <div className="user-error">
                    <div className="user-alert">
                      <span className="user-error-message">{errorMessage}</span>
                    </div>
                  </div>
                </div>
              )}
              <form action="" className="login" noValidate onSubmit={onSubmit}>
                <div className="login-data">
                  <input
                    {...register("email", {
                      required: "Correo es requerido",
                      minLength: {
                        value: 4,
                        message: "Minimo de 4 caracteres",
                      },
                      pattern: {
                        value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                        message: "Ingrese un correo valido",
                      },
                    })}
                    type="email"
                    id="user-data"
                    className={errors.email ? "user-data invalid" : "user-data"}
                    required
                    placeholder=" "
                    autoComplete="username"
                    name="email"
                  />
                  <label htmlFor="user-data" className="email-label">
                    Email
                  </label>
                  {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div className="login-data">
                  <input
                    {...register("password", {
                      required: "La contraseña es requerida",
                      minLength: {
                        value: 4,
                        message:
                          "La contraseña debe de tener entre 4 y 60 caracteres",
                      },
                      maxLength: {
                        value: 60,
                        message:
                          "La contraseña debe de tener entre 4 y 60 caracteres",
                      },
                    })}
                    required
                    autoComplete="current-password"
                    type="password"
                    id="user-password"
                    name="password"
                    className={
                      errors.password ? "user-data invalid" : "user-data"
                    }
                    placeholder=" "
                  />
                  <label htmlFor="user-password" className="password-label">
                    Contraseña
                  </label>
                  {errors.password && <span>{errors.password.message}</span>}
                </div>
                <button className="btn-login">Iniciar sesión</button>
              </form>
              <div className="login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                  className="remember"
                  id="remember"
                />
                <label htmlFor="remember" className="checkbox-label">
                  <span>Recúerdame</span>
                </label>
                <div className="help-container">
                  <Link to={"/resetPassword"}>
                    <span className="help">¿Necesitas ayuda?</span>
                  </Link>
                </div>
              </div>
              <div className="register">
                ¿Primera vez en Netflix?
                <Link to={"/signup"}>
                  <span className="sub">Suscríbete ahora</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
