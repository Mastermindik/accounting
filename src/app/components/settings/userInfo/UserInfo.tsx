import { IUser } from "@/app/models/IUser"
import styles from "./UserInfo.module.scss"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { useTheme } from "@/app/hooks/UseTheme"

type UserInfoProps = {
  user: IUser,
  setChanging: Dispatch<SetStateAction<"username" | "password" | "none">>
}

export default function UserInfo({ user: { email, roles, username }, setChanging }: UserInfoProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.user_info}>
      <FormControl variant="filled" className={styles.theme} >
        <InputLabel>Change Theme</InputLabel>
        <Select
          onChange={(e) => setTheme(e.target.value)}
          value={theme}
        >
          <MenuItem value={""}>Auto</MenuItem>
          <MenuItem value={"dark"}>Dark</MenuItem>
          <MenuItem value={"light"}>Light</MenuItem>
        </Select>
      </FormControl>

      <p>Main Info:</p>

      <TextField
        variant="filled"
        label="Username"
        value={username}
        InputProps={{
          readOnly: true
        }} />

      <TextField
        variant="filled"
        label="Email"
        value={email.replace(/^\w+/, "*******")}
        InputProps={{
          readOnly: true
        }} />

      <TextField
        variant="filled"
        label="Role"
        value={roles.toLowerCase()}
        InputProps={{
          readOnly: true
        }} />

      <Button variant="contained" color="secondary" onClick={() => setChanging("username")}>Change username</Button>
      <Button variant="contained" color="secondary" onClick={() => setChanging("password")}>Change password</Button>

    </div>
  )
}
