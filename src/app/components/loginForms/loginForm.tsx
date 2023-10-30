import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from "./styles.module.scss"
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { TextField, FormControl, InputLabel, FilledInput, InputAdornment, IconButton, FormHelperText, Button } from '@mui/material'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../../store/api/user.endpoint';
import { UseActions } from '../../hooks/UseActions';
import { redirect } from 'next/navigation';

type LoginFormProps = {
  flip: boolean,
  setFlip: Dispatch<SetStateAction<boolean>>,
}
type Inputs = yup.InferType<typeof schema>

const schema = yup.object({
  email: yup.string().required("Please enter login").email("Email must be valid"),
  password: yup.string().required("Please enter password").min(6, "Password must be at least 6 characters")
});

export default function LoginForm({ flip, setFlip }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, loginresult] = useLoginUserMutation();
  const { updateError } = UseActions();

  const { control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" }
  });

  const handleLogin: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    login(data);
  }

  useEffect(() => {
    if (loginresult.isSuccess) {
      redirect("/dashboard");
    }
  }, [loginresult])
  

  return (
    <div className={`${styles.login} ${flip ? styles.flip : ""}`}>
      <div className={styles.title}>
        Login
      </div>
      <form className={styles.form_login} noValidate onSubmit={handleSubmit(handleLogin)}>
      <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Email"
              variant='filled'
              size="small"
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
                      {showPassword ? 
                      <VisibilityOff color={!!errors.password ? "error" : "inherit"} /> : 
                      <Visibility color={!!errors.password ? "error" : "inherit"} />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error >{errors.password?.message ? errors.password?.message : " "}</FormHelperText>
            </FormControl>
          )}
        />
        <Button variant="contained" 
        color="success" 
        size="large"
        type='submit' >Login</Button>
        <Button variant='outlined'
        color='secondary' 
        size='large' 
        className={styles.google}
        onClick={() => location.href="http://localhost:8080/oauth2/authorization/google"} >Login with google</Button>
      </form>
      <p className={styles.to_register}
        onClick={() => setFlip((flip) => !flip)} >Or Create an Account</p>
    </div>
  )
}
