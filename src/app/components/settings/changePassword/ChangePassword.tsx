import { Button, TextField } from "@mui/material"
import styles from "./ChangePassword.module.scss"
import * as yup from "yup";
import { UseActions } from "@/app/hooks/UseActions";
import { useUpdateUserInfoMutation } from "@/app/store/api/user.endpoint";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";


const schema = yup.object({
  password: yup.string().required("Please confirm password").min(6, "Password must be at least 6 characters"),
  newPassword: yup.string().required("Please set new password").min(6, "Password must be at least 6 characters"),
  newPasswordConfirm: yup.string().required("Please confirm new password").oneOf([yup.ref("newPassword")], "Passwords do not match")
});

type Inputs = yup.InferType<typeof schema>

type ChangePasswordProps = {
  setChanging: Dispatch<SetStateAction<"username" | "password" | "none">>
}

export default function ChangePassword({ setChanging }: ChangePasswordProps) {
  const [update, updateResult] = useUpdateUserInfoMutation();

  const { control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { password: "", newPassword: "", newPasswordConfirm: "" }
  });

  const handleUpdate: SubmitHandler<Inputs> = (data) => {
    const { newPasswordConfirm, ...updateData } = data;
    update(updateData);
    setChanging("none");
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleUpdate)}
      className={styles.change_pasword} data-aos="fade-right">

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            variant="filled"
            label="Enter current password"
            error={!!errors.password}
            helperText={errors.password?.message ? errors.password.message : " "} />
        )}
      />

      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            variant="filled"
            label="Set new password"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message ? errors.newPassword.message : " "} />
        )}
      />

      <Controller
        name="newPasswordConfirm"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            variant="filled"
            label="Confirm password"
            error={!!errors.newPasswordConfirm}
            helperText={errors.newPasswordConfirm?.message ? errors.newPasswordConfirm.message : " "} />
        )}
      />

      <Button type="submit" variant="contained" color="success" >Save changes</Button>

    </form>
  )
}
