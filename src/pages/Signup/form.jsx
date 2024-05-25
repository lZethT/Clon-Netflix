import {
  ArrowBack,
  ArrowForward,
  CancelOutlined,
  CheckCircle,
  Done,
  ReportProblem,
} from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import plansData from "../../mocks/plan.json";
import { Link } from "react-router-dom";
import { UserContext } from "../../components/contexts/UserContext";

export const Step1 = () => {
  return (
    <>
      <div className="slide-in">
        <div className="simple-container">
          <div className="center-container">
            <div className="info">
              <div className="logo-container">
                <span className="logo-plan"></span>
              </div>
              <div className="step-header-container">
                <div className="step-header">
                  <span className="stepIndex">
                    PASO <b>1</b> DE <b>3</b>
                  </span>
                  <h1 className="stepTitle">Selecciona tu plan</h1>
                </div>
              </div>
              <div className="desc">
                <ul className="checkmark-group">
                  <li className="checkmark-group--row">
                    <Done className="check-icon" />
                    <span className="checkmark-group--text">
                      Sin compromisos, cancela cuando quieras.
                    </span>
                  </li>
                  <li className="checkmark-group--row">
                    <Done className="check-icon" />
                    <span className="checkmark-group--text">
                      Entretenimiento sin fin a un bajo costo.
                    </span>
                  </li>
                  <li className="checkmark-group--row">
                    <Done className="check-icon" />
                    <span className="checkmark-group--text">
                      Disfruta de Netflix en todos tus dispositivos.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="btn-wrapper">
                <button className="btn-next">Siguiente</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Step2 = ({ handlePrev, register, setValue }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  let plan = plansData.plans;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="slide-in">
        <ArrowBack className="prev-btn" onClick={handlePrev} />
        <div className="simple-container">
          <div className="plan-container">
            <div className="plan-header">
              <div className="header-container">
                <div className="step-header">
                  <span className="step">
                    PASO <b>1</b> DE <b>3</b>
                  </span>
                  <h1 className="step-title">
                    Selecciona el plan ideal para ti
                  </h1>
                </div>
              </div>
            </div>
            <div className="plan-selection">
              {screenWidth > 1049 ? (
                <PlanSelection
                  plan={plan}
                  version={"a"}
                  register={register}
                  setValue={setValue}
                />
              ) : (
                <PlanSelection
                  version={"b"}
                  register={register}
                  setValue={setValue}
                  plan={plan}
                />
              )}
            </div>
            <div className="about">
              <div>
                <small className="info-wrapper">
                  <span>
                    La disponibilidad del contenido en Full HD (1080p), Ultra HD
                    (4K) y HDR depende de tu servicio de internet y del
                    dispositivo en uso. No todo el contenido está disponible en
                    todas las resoluciones.
                  </span>
                </small>
                <small className="info-wrapper">
                  <span>
                    Solo las personas que vivan contigo pueden usar tu cuenta.
                    Agrega 1 miembro extra con el plan Estándar o hasta 2 con el
                    plan Premium. Puedes ver Netflix en 4 dispositivos al mismo
                    tiempo con el plan Premium y en 2 con el plan Estándar o
                    Estándar con anuncios.
                  </span>
                </small>
              </div>
            </div>
            <div className="btn-wrapper">
              <button className="btn-next">Siguiente</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PlanSelection = ({ plan, version, register, setValue }) => {
  const [checked, setChecked] = useState(0);
  const handlePlanSelection = (planId, index) => {
    setChecked(index);
    setValue("plan", JSON.stringify(plan[planId - 1]));
  };

  if (version === "a") {
    return Object.keys(plan).map((planId, index) => (
      <div
        className="plan-type-a"
        key={plan[planId].id}
        onClick={() => handlePlanSelection(plan[planId].id, index)}
      >
        <div className="plan-a">
          <input
            type="radio"
            name="plan"
            className="plan"
            defaultChecked={checked === index}
            id={plan[planId].id}
            value={JSON.stringify(plan[planId])}
            {...register("plan")}
          />
          <label
            htmlFor={plan[planId].id}
            className={`plan-${plan[planId].id}`}
          >
            <span className="membership">{plan[planId].plan}</span>
            <span className="quality">{plan[planId].quality}</span>
            <div className="checked">
              <CheckCircle className="icon" />
            </div>
          </label>
          <div className="details">
            <ul className="details-container">
              <li className="price">
                <div className="info-container">
                  <span className="info-title">Precio mensual</span>
                  <span className="data">{plan[planId].price}</span>
                </div>
              </li>
              <li className="video">
                <div className="info-container">
                  <span className="info-title">Calidad de audio y video</span>
                  <span className="data">{plan[planId].video}</span>
                </div>
              </li>
              <li className="resolution">
                <div className="info-container">
                  <span className="info-title">Resolución</span>
                  <span className="data">{plan[planId].resolution}</span>
                </div>
              </li>
              {plan[planId].audio && (
                <li className="audio">
                  <div className="info-container">
                    <span className="info-title">{`Audio espacil (sonido inmersivo)`}</span>
                    <span className="data">{plan[planId].audio}</span>
                  </div>
                </li>
              )}
              <li className="devices">
                <div className="info-container">
                  <span className="info-title">Dispositivos compatibles</span>
                  <span className="data">{plan[planId].devices}</span>
                </div>
              </li>
              <li className="numDevices">
                <div className="info-container">
                  <span className="info-title">
                    Dispositivos del hogar en los que se puede ver Netflix al
                    mismo tiempo
                  </span>
                  <span className="data">{plan[planId].numDevices}</span>
                </div>
              </li>
              <li className="downloadDev">
                <div className="info-container">
                  <span className="info-title">Dispositivos de descarga</span>
                  <span className="data">{plan[planId].downloadDev}</span>
                </div>
              </li>
              <li className="ads">
                <div className="info-container">
                  <span className="info-title">Anuncios</span>
                  <span className="data">{plan[planId].ads}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ));
  } else {
    return (
      <>
        <div className="plan-alternative">
          {Object.keys(plan).map((planId, index) => (
            <div className="plan-type-b" key={plan[planId].id}>
              <div className="plan-b">
                <input
                  type="radio"
                  name="plan"
                  className="plan"
                  defaultChecked={checked === index}
                  id={plan[planId].id}
                  value={JSON.stringify(plan[planId])}
                  {...register("plan")}
                />
                <label
                  htmlFor={plan[planId].id}
                  className={`plan-${plan[planId].id}`}
                  onClick={() => setChecked(index)}
                >
                  <span className="membership">{plan[planId].plan}</span>
                  <span className="quality">{plan[planId].quality}</span>
                  <div className="checked">
                    <CheckCircle className="icon" />
                  </div>
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="current-plan">
          <ul className="features">
            <li className="price">
              <div className="features-info">
                <span className="feature-title">Precio mensual</span>
                <span className="feature-data">{plan[checked].price}</span>
              </div>
            </li>
            <li className="video">
              <div className="features-info">
                <span className="feature-title">Calidad de audio y video</span>
                <span className="feature-data">{plan[checked].video}</span>
              </div>
            </li>
            <li className="resolution">
              <div className="features-info">
                <span className="feature-title">Resolución</span>
                <span className="feature-data">{plan[checked].resolution}</span>
              </div>
            </li>
            {plan[checked].audio && (
              <li className="audio">
                <div className="features-info">
                  <span className="feature-title">
                    Audio espacial (sonido inmersivo)
                  </span>
                  <span className="feature-data">{plan[checked].audio}</span>
                </div>
              </li>
            )}
            <li className="devices">
              <div className="features-info">
                <span className="feature-title">Dispositivos compatibles</span>
                <span className="feature-data">{plan[checked].devices}</span>
              </div>
            </li>
            <li className="numDevices">
              <div className="features-info">
                <span className="feature-title">
                  Dispositivos del hogar en los que se puede ver Netflix al
                  mismo tiempo
                </span>
                <span className="feature-data">{plan[checked].numDevices}</span>
              </div>
            </li>
            <li className="downloadDev">
              <div className="features-info">
                <span className="feature-title">Dispositivos de descarga</span>
                <span className="feature-data">
                  {plan[checked].downloadDev}
                </span>
              </div>
            </li>
            <li className="ads">
              <div className="features-info">
                <div className="feature-title">Anuncios</div>
                <div className="feature-data">{plan[checked].ads}</div>
              </div>
            </li>
          </ul>
        </div>
      </>
    );
  }
};

export const Step3 = ({ handlePrev }) => {
  return (
    <>
      <div className="slide-in">
        <ArrowBack className="prev-btn" onClick={handlePrev} />
        <div className="simple-container">
          <div className="center-container">
            <div className="info">
              <div className="logo-container">
                <span className="logo-devices"></span>
              </div>
              <div className="step-header-container">
                <div className="step-header">
                  <span className="stepIndex">
                    PASO <b>2</b> DE <b>3</b>
                  </span>
                  <h1 className="stepTitle">
                    Completa la configuración de tu cuenta
                  </h1>
                </div>
              </div>
              <div className="desc">
                Netflix está personalizado para ti. Crea una contraseña para
                comenzar a ver Netflix.
              </div>
              <div className="btn-wrapper">
                <button className="btn-next">Siguiente</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Step4 = ({
  register,
  errors,
  handlePrev,
  watch,
  checkedEmail,
  userEmail,
}) => {
  return (
    <>
      <div className="slide-in">
        <ArrowBack className="prev-btn" onClick={handlePrev} />
        <div className="simple-container">
          <div className="center-container">
            <div className="reg-form">
              {checkedEmail && (
                <div className="message-container">
                  <div className="message">
                    <div className="info-container">
                      <div className="alert-info">
                        <ReportProblem className="icon" />
                        <div className="alert-wrapper">
                          <span className="alert">
                            <b>Parece que esa cuenta ya existe. </b>
                            <Link to={"/login"} className="alert-link">
                              Inicia sesión en esa cuenta
                            </Link>{" "}
                            o prueba con otro email.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <div className="step-header-container">
                  <div className="step-header">
                    <span className="step-indicator">
                      PASO <b>2</b> DE <b>3</b>
                    </span>
                    <h1 className="step-title">
                      Crea una contraseña para que comiences tu membresía
                    </h1>
                  </div>
                </div>
                <div>
                  <span className="title">¡Unos pasos más y listo!</span>
                  <span className="info">Tampoco nos gustan los trámites.</span>
                  <ul className="userData-container">
                    <li className="email-container">
                      <div className="input-container">
                        <input
                          {...register("email", {
                            required: "Correo es requerido",
                            minLength: {
                              value: 4,
                              message: "Minimo de 4 caracteres",
                            },
                            pattern: {
                              value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                              message: "Escribe una dirección de email válida.",
                            },
                          })}
                          required
                          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                          id="mail"
                          type="email"
                          className={errors.email ? "mail invalid" : "mail"}
                          defaultValue={userEmail ? userEmail : null}
                          autoComplete="off"
                          placeholder=" "
                        />
                        <label htmlFor="mail">Email</label>
                      </div>
                    </li>
                    {errors.email && (
                      <div className="error">
                        <CancelOutlined className="icon" />
                        <span>{errors.email?.message}</span>
                      </div>
                    )}
                    <li className="password-container">
                      <div className="input-container">
                        <input
                          type="password"
                          id="password"
                          placeholder=" "
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
                        <label htmlFor="password">Agrega una contraseña</label>
                      </div>
                    </li>
                    {errors.password && (
                      <div className="error">
                        <CancelOutlined className="icon" />
                        <span>{errors.password?.message}</span>
                      </div>
                    )}
                    <li className="confirm-password">
                      <div className="input-container">
                        <input
                          id="confirmPassword"
                          type="password"
                          placeholder=" "
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
                        <label htmlFor="confirmPassword">
                          Confirmar contraseña
                        </label>
                      </div>
                    </li>
                    {errors.confirmPassword && (
                      <div className="error">
                        <CancelOutlined className="icon" />
                        <span>{errors.confirmPassword?.message}</span>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
              <div className="btn-wrapper">
                <button>Siguiente</button>
              </div>
              <div className="note-container">
                <span className="note-title">Nota:</span>
                <span className="note">
                  La página usa IndexedDB, por lo que no es necesario ingresar
                  un correo electronico real.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Step5 = ({ handlePrev, setIsLastStep }) => {
  return (
    <div className="slide-in">
      <ArrowBack className="prev-btn" onClick={handlePrev} />
      <div className="simple-container">
        <div className="center-container">
          <div className="payment-container">
            <div className="payment-header">
              <div className="stepIcon-container">
                <span className="icon"></span>
              </div>
              <div className="step-container">
                <div className="step-header">
                  <span className="step">
                    PASO <b>3</b> DE <b>3</b>
                  </span>
                  <h1 className="step-title">Elige cómo quieres pagar</h1>
                </div>
              </div>
              <div className="info-container">
                <span className="extra-title">
                  Tu forma de pago está encriptada y puedes cambiarla cuando
                  quieras.
                </span>
                <div className="extra">
                  <span className="extra-1">
                    Transacciones seguras y confiables.
                  </span>
                  <span className="extra-2">Cancela fácilmente online.</span>
                </div>
              </div>
              <div className="btn-container">
                <button
                  className="btn-payment"
                  onClick={() => setIsLastStep(true)}
                >
                  Que diosito se lo pague <ArrowForward className="icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Step6 = () => {
  const { setIsLoggedIn } = useContext(UserContext);

  const handleClick = () => {
    setIsLoggedIn(true);
  };
  return (
    <div className="slide-in">
      <div className="simple-container">
        <div className="center-container">
          <div className="info">
            <div className="logo-container">
              <span className="logo-end"></span>
            </div>
            <div className="step-header-container">
              <div className="step-header">
                <h1 className="stepTitle">Suscripción completada</h1>
              </div>
            </div>
            <div className="enjoy">
              Ahora puedes disfrutar de tus series y películas
            </div>
            <div className="btn-wrapper" onClick={handleClick}>
              <Link to={"/home"}>
                <button type="button" className="btn-next">
                  Ir a Netflix
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
