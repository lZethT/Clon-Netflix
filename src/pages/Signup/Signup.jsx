import React from "react";
import "./signup.scss";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Step1, Step2, Step3, Step4, Step5, Step6 } from "./form";
import { useIndexedDB } from "../../components/contexts/IDBContext";
import { v4 as uuidv4 } from "uuid";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [step, setStep] = useState(1);
  const [isLastStep, setIsLastStep] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState(false);

  const { userEmail } = useParams();
  const { addToIndexedDB, checkEmailExists } = useIndexedDB();

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onSubmit = handleSubmit(async (data) => {
    const id = uuidv4();

    if (!isLastStep && step !== 4) {
      handleNext();
    } else {
      if (isLastStep) {
        const userData = {
          id: id,
          email: data.email.toLowerCase(),
          password: data.password,
          plan: data.plan,
        };
        addToIndexedDB(userData);
        handleNext();
      }
      if (step === 4) {
        try {
          const emailExists = await checkEmailExists(data.email.toLowerCase());
          emailExists.found
            ? setCheckedEmail(true)
            : setCheckedEmail(false)(handleNext());
        } catch (e) {
          console.log("Hubo un error en la verificación del email " + e);
        }
      }
    }
  });

  return (
    <div className="layout">
      <header className="header-sg">
        <div className="icon">
          <Link to={"/"}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
              alt="netflixIcon"
              className="NetflixIcon"
            />
          </Link>
        </div>
        <div className="login">
          <Link to={"/login"}>
            <span>Iniciar sesión</span>
          </Link>
        </div>
      </header>
      <section className="container">
        <form onSubmit={onSubmit} noValidate className="new-user">
          {step === 1 && <Step1 />}
          {step === 2 && (
            <Step2
              handlePrev={handlePrev}
              register={register}
              setValue={setValue}
            />
          )}
          {step === 3 && <Step3 handlePrev={handlePrev} />}
          {step === 4 && (
            <Step4
              register={register}
              errors={errors}
              handlePrev={handlePrev}
              watch={watch}
              checkedEmail={checkedEmail}
              userEmail={userEmail}
            />
          )}
          {step === 5 && (
            <Step5 handlePrev={handlePrev} setIsLastStep={setIsLastStep} />
          )}
          {step === 6 && <Step6 />}
        </form>
      </section>
    </div>
  );
};
