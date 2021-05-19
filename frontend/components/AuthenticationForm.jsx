import React, { useEffect, useState } from "react";

import styles from "../styles/components/AuthenticationForm.module.css";
import { capitalizeFirstLetterEachWord } from "../utils/helpers";

export default function AuthenticationForm({ handleSubmit, submitError }) {
  const [formType, setFormType] = useState("register");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const handleEnterToSubmit = (e) => {
      if (e.key === "Enter" && e.target.type === "password") {
        handleSubmit({
          username: name,
          email: email,
          password: password,
          action: formType,
        });
      }
    }

    document.addEventListener('keydown', handleEnterToSubmit);

    return () => {
      document.removeEventListener('keydown', handleEnterToSubmit);
    }
  }, [])

  const handleChangeForm = (form) => {
    setFormType(form);
  };

  return (
    <div className={styles.authenticationFormContainer}>
      <div className={styles.btnContainer}>
        <button
          className={formType === "register" ? styles.active : null}
          onClick={() => handleChangeForm("register")}
        >
          Registrar-se
        </button>
        <button
          className={formType === "login" ? styles.active : null}
          onClick={() => handleChangeForm("login")}
        >
          Entrar
        </button>
      </div>
      <div className={styles.iptContainer}>
        {formType === "register" && (
          <input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) =>
              setName(capitalizeFirstLetterEachWord(e.target.value))
            }
          />
        )}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {submitError && <span className={styles.submitError}>Informações incorretas, verifique novamente os dados.</span>}
      </div>
      <button
        onClick={() =>
          handleSubmit({
            username: name,
            email: email,
            password: password,
            action: formType,
          })
        }
      >
        Concluir
      </button>
    </div>
  );
}
