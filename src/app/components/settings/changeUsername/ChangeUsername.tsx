import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./ChangeUsername.module.scss"
import { Button, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useUpdateUserInfoMutation } from "@/app/store/api/user.endpoint";
import { Dispatch, SetStateAction, useEffect } from "react";
import { UseActions } from "@/app/hooks/UseActions";

type ChangeUsernameProps = {
  currentUsername: string,
  setChanging: Dispatch<SetStateAction<"username" | "password" | "none">>
}

export default function ChangeUsername({ currentUsername, setChanging }: ChangeUsernameProps) {
  const [update, updateResult] = useUpdateUserInfoMutation();

  useEffect(() => {
  }, [updateResult])


  type Inputs = yup.InferType<typeof schema>

  const schema = yup.object({
    newUsername: yup.string().required("Please set new username").notOneOf([currentUsername], "New username can't be same as previous").min(3, "Min 3 symbols").max(15, "Max 15 symbols"),
    password: yup.string().required("Please confirm password").min(6, "Password must be at least 6 characters")
  });

  const { control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { newUsername: "", password: "" }
  });

  const handleUpdate: SubmitHandler<Inputs> = (data) => {
    update(data);
    setChanging("none");
  }


  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleUpdate)}
      className={styles.change_username}
      data-aos="fade-right">

      <Controller
        name="newUsername"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            variant="filled"
            label="Set new username"
            error={!!errors.newUsername}
            helperText={errors.newUsername?.message ? errors.newUsername.message : " "} />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            variant="filled"
            label="Confirm password"
            error={!!errors.password}
            helperText={errors.password?.message ? errors.password.message : " "} />
        )}
      />

      <Button type="submit" variant="contained" color="success" >Save changes</Button>

    </form>
  )
}
