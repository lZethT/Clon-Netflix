import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./resetPassword.scss";
import { useIndexedDB } from "../../components/contexts/IDBContext";

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [step, setStep] = useState(1);
  const [checkedEmail, setCheckedEmail] = useState(false);
  const { updateInIndexedDB, checkEmailExists } = useIndexedDB();

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
    setCheckedEmail(false);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (step === 1) {
      try {
        const emailExists = await checkEmailExists(data.email.toLowerCase());
        emailExists.found ? handleNext() : setCheckedEmail(true);
      } catch (e) {
        console.log("Hubo un error en la verificación del email " + e);
      }
    } else {
      try {
        const userEmail = data.email.toLowerCase();
        const userNewPassword = data.password;

        const setNewPassword = await updateInIndexedDB(
          userEmail,
          userNewPassword
        );
        setNewPassword ? handleNext() : console.log("Algo salió mal");
      } catch (e) {
        console.log("Hubo un error al actualizar la contraseña" + e);
      }
    }
  });

  return (
    <>
      <header className="header-lg h-reset">
        <div className="header__wrapper">
          <div className="container">
            <Link to={"/"}>
              <div className="icon-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                  alt="netflixIcon"
                  className="NetflixIcon-2"
                />
              </div>
            </Link>
            <div className="lgn">
              <Link to={"/login"} className="btn-login">
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="image__wrapper reset">
        <img
          src="https://assets.nflxext.com/ffe/siteui/acquisition/login/login-the-crown_2-1500x1000.jpg"
          alt="background"
          className="background"
        />
      </div>
      <main className="login-main-2">
        <section className="form__wrapper-2">
          <div className="form-2">
            <div className="form-data-2">
              <h1 className="form__title-2">Olvidaste tu contraseña</h1>
              <form className="login-2" noValidate onSubmit={onSubmit}>
                {checkedEmail && (
                  <p className="not-found">
                    El email que ha ingresado no se encuentre registrado
                  </p>
                )}
                {step === 1 && (
                  <>
                    <p className="idk">
                      Ingrese el email con el cuál se registro.
                    </p>
                    {errors.email && (
                      <span className="span-error">{errors.email.message}</span>
                    )}
                    <div className="login-data-2">
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
                        className={
                          errors.email ? "user-data invalid" : "user-data"
                        }
                        required
                        placeholder="nombre@ejemplo.com"
                        autoComplete="username"
                        name="email"
                      />
                    </div>
                    <button className="btn-sndEmail">Verificar email</button>
                  </>
                )}
                {step === 2 && (
                  <>
                    <p className="idk">Ingrese su nueva contraseña.</p>
                    <div className="login-data-2">
                      <input
                        type="password"
                        id="password"
                        placeholder="Nueva contraseña"
                        className={
                          errors.password ? "password invalid" : "password"
                        }
                        {...register("password", {
                          required: "Una contraseña es requerida",
                          minLength: {
                            value: 4,
                            message:
                              "La contraseña debe de tener al menos 4 carácteres",
                          },
                          maxLength: {
                            value: 15,
                            message:
                              "La contraseña no debe de tener más de 15 carácteres",
                          },
                        })}
                      />
                      {errors.password && (
                        <span className="span-error">
                          {errors.password.message}
                        </span>
                      )}
                      <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirmar contraseña"
                        className={
                          errors.confirmPassword
                            ? "confirmPassword  invalid"
                            : "confirmPassword "
                        }
                        {...register("confirmPassword", {
                          required: "Una contraseña es requerida",
                          validate: (value) =>
                            value === watch("password") ||
                            "Las contraseñas no coinciden",
                        })}
                      />
                      {errors.confirmPassword && (
                        <span className="span-error">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    </div>
                    <button className="btn-sndEmail">Nueva contraseña</button>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className="login-data-2">
                      <p className="done">
                        Se ha cambiado la contraseña con exito, ahora puede
                        ingresar con ella.
                      </p>
                    </div>
                    <Link to={"/login"}>
                      <button className="btn-sndEmail">Ingresar</button>
                    </Link>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
