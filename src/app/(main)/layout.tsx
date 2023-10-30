import React from 'react'
import styles from "./layout.module.scss"
import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/header/Header'
import MyThemeProvider from '../providers/MyThemeProvider'
import AosProvider from '../providers/AosProvider'
import ModalEditTransaction from '../components/transactions/modalEditTransaction/ModalEditTransaction'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <MyThemeProvider>
      <AosProvider>
        <div className={styles.main_layout}>
          <Sidebar />
          <div className={styles.flex}>
            <Header />
            {children}
          </div>
          <ModalEditTransaction />
        </div>
      </AosProvider>
    </MyThemeProvider>
  )
}
