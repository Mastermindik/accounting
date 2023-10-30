"use client"
import React from 'react'
import { Button } from "@mui/material"
import styles from "./not-found.module.scss"
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter();
  return (
    <div className={styles.error}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Oops!</h1>
        <div className={styles.not_found}>
          <h2 className={styles.subtitle}>404 - Page not found</h2>
          <p className={styles.descr}>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
          <Button color="primary"
            variant="contained"
            size="large"
            className={styles.btn}
            onClick={() => router.replace("/dashboard")} >go to homepage</Button>
        </div>
      </div>
    </div>
  )
}
