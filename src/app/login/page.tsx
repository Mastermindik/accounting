"use client"
import styles from "./styles.module.scss"
import { useState } from "react"
import RegistrationForm from "../components/loginForms/registrationForm"
import LoginForm from "../components/loginForms/loginForm"

export default function Login() {
  const [flip, setFlip] = useState<boolean>(false);

  return (
    <main className={styles.main}>
      <div className={styles.form_wrapper}>
        <LoginForm flip={flip} setFlip={setFlip} />
        <RegistrationForm flip={flip} setFlip={setFlip} />
      </div>
    </main>
  )
}
