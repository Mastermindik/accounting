"use client"
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, InputLabel, FormHelperText, OutlinedInput, TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import styles from "./ModalEditTransaction.module.scss"
import { useAppSelector } from "@/app/hooks/ReduxHooks";
import { UseActions } from "@/app/hooks/UseActions";
import { useEditTransactionMutation } from "@/app/store/api/transaction.endpoint";

type Inputs = yup.InferType<typeof schema>

const schema = yup.object({
  sum: yup.number(),
  description: yup.string(),
  date: yup.date()
});

export default function ModalEditTransaction() {
  const [date, setDate] = useState<Moment | null>(moment());
  const { id, description, sum, transactionDate } = useAppSelector(state => state.modal);
  const { closeModal } = UseActions();
  const [edit, editResult] = useEditTransactionMutation();
  

  const { control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema),
    // defaultValues: { description: description, sum: sum, date: moment(transactionDate).toDate() },
    values: {description, sum, date: moment(transactionDate).toDate()}
  });

  const handleAdd: SubmitHandler<Inputs> = (data) => {

    console.log(moment(date).format("yyyy-MM-DD hh:mm:ss"));
    console.log(data);
    const newData = { ...data, date: moment(date).format("yyyy-MM-DD HH:mm:ss") };
    if (data.date !== moment(transactionDate).toDate() ||
      data.description !== description ||
      data.sum !== sum) {
      edit({ id, ...newData });
    } else {
      closeModal();
    }
  }

  useEffect(() => {
    if (editResult.isSuccess) {
      closeModal();
    }
  }, [editResult])
  
  return (
    <div className={styles.wrapper}>
      <form
        noValidate
        onSubmit={handleSubmit(handleAdd)}
        className={styles.modal} >

        <Controller
          name='sum'
          control={control}
          render={({ field }) => (
            <FormControl variant="outlined" required fullWidth error={!!errors.sum} >
              <InputLabel >Set sum</InputLabel>
              <OutlinedInput
                {...field}
                label="Set sum"
                type="number"
              />
              <FormHelperText error>
                {errors.sum?.message ? errors.sum.message : " "}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                {...field}
                className={styles.date}
                value={date}
                maxDate={moment()}
                onChange={newDate => setDate(newDate)}
              />
            </LocalizationProvider>
          )}
        />


        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              multiline
              rows={6}
              margin="normal"
            />
          )}
        />

        <div className={styles.btn_group}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="success"
            className={styles.btn}
          >Save changes</Button>
          <Button
            type="button"
            variant="contained"
            size="large"
            color="error"
            className={styles.btn}
            onClick={() => closeModal()}
          >Decline changes</Button>
        </div>

      </form>
    </div>
  )
}

