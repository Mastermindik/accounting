"use client"
import Link from "next/link"
import styles from "./Sidebar.module.scss"
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton } from "@mui/material";
import { redirect, usePathname } from "next/navigation";
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogoutUserMutation } from "@/app/store/api/user.endpoint";
import { useEffect } from "react";

export default function Sidebar() {
  const [logout, logoutResult] = useLogoutUserMutation();

  const handlelogout = () => {
    logout();
  }

  useEffect(() => {
    if (logoutResult.isSuccess) {
      document.cookie = `jwt-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      redirect("/login")
    }
  }, [logoutResult])
  

  const toggleMenu = () => {
    document.querySelector(`.${styles.sidebar}`)?.classList.toggle(`${styles.active}`)
  }

  const switchActive = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    document.querySelectorAll(`.${styles.link_item}`).forEach(e => e.classList.remove(`${styles.active}`));
    e.currentTarget.classList.add(`${styles.active}`);
  }

  const page = usePathname().substring(1);

  return (
    <div className={`${styles.sidebar} ${styles.active}`}>
      <div className={styles.icon}>
        <IconButton size="large" onClick={toggleMenu}>
          <MenuIcon fontSize="large" />
        </IconButton>
      </div>
      <Link href={"/dashboard"} className={`${styles.link_item} ${page === "dashboard" ? styles.active : ""}`} >
        <HomeIcon />
        <div className={styles.link_name}>Dashboard</div>
      </Link>
      <Link href={"/transactions"} className={`${styles.link_item} ${page === "transactions" ? styles.active : ""}`}>
        <PaidIcon />
        <div className={styles.link_name}>Transactions</div>
      </Link>
      <Link href={"/addTransaction"} className={`${styles.link_item} ${page === "addTransaction" ? styles.active : ""}`}>
        <AddIcon />
        <div className={styles.link_name}>Add Transaction</div>
      </Link>
      <Link href={"/statistic"} className={`${styles.link_item} ${page === "statistic" ? styles.active : ""}`}>
        <BarChartIcon />
        <div className={styles.link_name}>Statistic</div>
      </Link>
      <Link href={"/settings"} className={`${styles.link_item} ${page === "settings" ? styles.active : ""}`}>
        <SettingsIcon />
        <div className={styles.link_name}>Settings</div>
      </Link>
      <a className={`${styles.link_item}`} onClick={handlelogout}>
        <LogoutIcon />
        <div className={styles.link_name}>LogOut</div>
      </a>
    </div>
  )
}
