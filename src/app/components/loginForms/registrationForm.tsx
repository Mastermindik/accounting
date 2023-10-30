import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import styles from "./styles.module.scss"
import { Button, FilledInput, FormControl, FormControlLabel, FormHelperText, FormLabel, IconButton, InputAdornment, InputLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { redirect } from 'next/navigation'
import { UseActions } from '../../hooks/UseActions'
import { useRegisterUserMutation } from '../../store/api/user.endpoint'

type RegisterFormProps = {
  flip: boolean,
  setFlip: Dispatch<SetStateAction<boolean>>,
}


const schema = yup.object({
  username: yup.string().required("Please enter username").min(3, "Min 3 symbols").max(15, "Max 15 symbols"),
  email: yup.string().email("Email must be valid").required("Please enter email"),
  password: yup.string().required("Please enter password").min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords do not match").required("Please confirm password")
});

type Inputs = yup.InferType<typeof schema>

export default function RegistrationForm({ flip, setFlip }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [register, registerResult] = useRegisterUserMutation();
  const { updateError } = UseActions();

  const { control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" }
  });

  const handleRegister: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const { confirmPassword, ...req } = data;
    register(req)
  }

  useEffect(() => {
    if (registerResult.isSuccess) {
      redirect("/dashboard");
    }
  }, [registerResult])
  
  return (
    <div className={`${styles.registration} ${flip ? styles.flip : ""}`}>
      <div className={styles.title}>
        Registration
      </div>
      <form className={styles.form_register} noValidate onSubmit={handleSubmit(handleRegister)}>

        <Controller
          name='username'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Username"
              variant='filled'
              size="small"
              error={!!errors.username}
              helperText={errors.username?.message ? errors.username.message : " "} />
          )}
        />

        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Email"
              variant='filled'
              size='small'
              type='email'
              error={!!errors.email}
              helperText={errors.email?.message ? errors.email.message : " "} />
          )}
        />


        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <FormControl variant='filled' required size='small' error={!!errors.password} >
              <InputLabel color="primary">Password</InputLabel>
              <FilledInput
                {...field}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end" >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error >{errors.password?.message ? errors.password?.message : " "}</FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name='confirmPassword'
          control={control}
          render={({ field }) => (
            <FormControl variant='filled' required size='small' error={!!errors.confirmPassword} >
              <InputLabel color="primary">Confirm password</InputLabel>
              <FilledInput
                {...field}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end" >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error >{errors.confirmPassword?.message ? errors.confirmPassword?.message : " "}</FormHelperText>
            </FormControl>
          )}
        />

        <Button variant="contained"
          color="success"
          size="large"
          type='submit'>
          Registration
        </Button>
      </form>
      <p className={styles.to_login}
        onClick={() => setFlip((flip) => !flip)} >Or Login</p>
    </div>
  )
}
