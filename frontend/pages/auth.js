import React, { useContext, useEffect, useState } from "react";
import AuthenticationForm from "../components/AuthenticationForm";
import { AuthContext } from "../context/AuthContext";
import Head from "next/head";

import styles from "../styles/pages/Auth.module.css";
import { useRouter } from "next/router";

export default function Auth({ redirectTo, context }) {
  const { register, login } = useContext(AuthContext);
  
  const [submitError, setSubmitError] = useState(false);
  
  useEffect(() => {
    if (submitError) {
      setTimeout(() => {
        setSubmitError(false);
      }, 5000);
    }
  }, [submitError])
  
  const router = useRouter();

  const handleSubmit = async (formValues) => {
    const { password, action, email, username } = formValues;
    const { redirect } = router.query;

    if (action === "register") {
      const successfulRegister = await register(username, email, password, redirect);
      
      setSubmitError(!successfulRegister);
    } else if (action === "login") {
      const successfulLogin = await login(email, password, redirect);
      
      setSubmitError(!successfulLogin);
    }
  };

  return (
    <>
      <Head>
        <title>{`Loja | Login ou Cadastrar-se`}</title>
      </Head>
      <div className={styles.authContainer}>
        <h2>Insira suas informações:</h2>
        <AuthenticationForm handleSubmit={handleSubmit} submitError={submitError}/>
      </div>
    </>
  );
}
