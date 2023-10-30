"use client"
import UserPhoto from "@/app/components/settings/userPhoto/UserPhoto"
import styles from "./page.module.scss"
import UserInfo from "@/app/components/settings/userInfo/UserInfo"
import { useGetUserQuery } from "@/app/store/api/user.endpoint"
import { useState } from "react"
import ChangeUsername from "@/app/components/settings/changeUsername/ChangeUsername"
import ChangePassword from "@/app/components/settings/changePassword/ChangePassword"
import { defaultUser } from "@/app/models/IUser"


export default function Settings() {
  const { currentData: user = defaultUser } = useGetUserQuery();
  
  const [changing, setChanging] = useState<"username" | "password" | "none">("none");
  
  const changes = {
    username: <ChangeUsername currentUsername={user.username} setChanging={setChanging} />,
    password: <ChangePassword setChanging={setChanging} />,
    none: ""
  }
//фетчити на сервері щоб не було видно емайлу?
  return (
    <div className={styles.settings}>
      <div className={styles.wrapper}>
        <UserPhoto url={user.pictureUrl} />
        <UserInfo user={user} setChanging={setChanging} />
        {changes[changing]}
      </div>
    </div>
  )
}
