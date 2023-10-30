"use client"
import React from 'react'
import styles from "./Header.module.scss"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useGetUserQuery } from '@/app/store/api/user.endpoint'
import Image from 'next/image'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function Header() {
  const currentPage = usePathname().substring(1);
  const { currentData = {email: "", pictureUrl: "", roles: "", username: "", budget: {expenses: 0,incomes:0,increaseExpenses:0,increaseIncomes:0,total:0}} } = useGetUserQuery();
  
  return (
    <header className={styles.header}>
      <h1 className={styles.current_page}>
        {currentPage}
      </h1>
      <Link href={"/settings"} className={styles.user}>
        <div className={styles.photo}>
          {currentData.pictureUrl ? 
          <Image src={currentData.pictureUrl as string} alt='' width={32} height={32} />: 
          <AccountBoxIcon sx={{width: "2rem", height: "2rem"}} /> }
          <img src="" alt="" />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>
            {currentData?.username}
          </div>
          <div className={styles.role}>
            {currentData?.roles.toLowerCase()}
          </div>
        </div>
      </Link>
    </header>
  )
}
