import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./AddForm.module.scss"
import * as yup from "yup";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ICategories } from "@/app/models/ICategories";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment, { Moment } from "moment";
import { useAddTransactionMutation } from "@/app/store/api/transaction.endpoint";
import { UseActions } from "@/app/hooks/UseActions";

type Inputs = yup.InferType<typeof schema>

const schema = yup.object({
  type: yup.string().required("Please chose type").oneOf(["income", "expense"], "Please chose type"),
  category: yup.string().required("Please chose category"),
  sum: yup.number().required("Please chose sum").min(1, "Sum must be more than 0"),
  description: yup.string(),
  date: yup.date()
});

type AddFormProps = {
  categories: ICategories
}

export default function AddForm({ categories }: AddFormProps) {
  const [date, setDate] = useState<Moment | null>(moment());
  const [addTransaction, addTransactionResult] = useAddTransactionMutation();
  const { updateSuccess } = UseActions();

  const categoryType = {
    income: categories.incomes,
    expense: categories.expenses,
    all: [""]
  }

  const { control, handleSubmit, formState: { errors }, watch, reset } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { category: "", description: "", sum: 0, type: "all", date: moment().toDate() }
  });

  useEffect(() => {
    if (addTransactionResult.isSuccess) {
      reset();
    }
  }, [addTransactionResult])

  const type = watch("type") as "income" | "expense" | "all";

  const handleAdd: SubmitHandler<Inputs> = (data) => {

    console.log(moment(date).format("yyyy-MM-DD hh:mm:ss"));
    console.log(data);
    const type = data.type as "income" | "expense";
    const newData = { ...data, type, date: moment(date).format("yyyy-MM-DD HH:mm:ss") };
    addTransaction(newData);
  }

  return (
    <form className={styles.add_form}
      noValidate
      onSubmit={handleSubmit(handleAdd)}
      data-aos="fade-right"
    >
      <Controller
        name='type'
        control={control}
        render={({ field }) => (
          <FormControl variant="outlined" required fullWidth error={!!errors.type} >
            <InputLabel >Set type</InputLabel>
            <Select
              {...field}
              label="Set type"
              inputProps={{MenuProps: {disableScrollLock: true}}}
            >
              <MenuItem value={"all"} >All</MenuItem>
              <MenuItem value={"expense"} >Expense</MenuItem>
              <MenuItem value={"income"} >Income</MenuItem>
            </Select>
            <FormHelperText error>
              {errors.type?.message ? errors.type.message : " "}
            </FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name='category'
        control={control}
        render={({ field }) => (
          <FormControl variant="outlined" required fullWidth error={!!errors.category} disabled={type === "all"} >
            <InputLabel >Set category</InputLabel>
            <Select
              {...field}
              label="Set category"
              inputProps={{MenuProps: {disableScrollLock: true}}}
            >
              {categoryType[type].map(e =>
                <MenuItem value={e} key={e} >{e}</MenuItem>)}
            </Select>
            <FormHelperText error>
              {errors.category?.message ? errors.category.message : " "}
            </FormHelperText>
          </FormControl>
        )}
      />

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
          // <DesktopDatePicker {...field}  />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              {...field}
              className={styles.date}
              value={date}
              maxDate={moment()}
              // defaultValue={moment()}
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

      <Button
        type="submit"
        variant="contained"
        size="large"
        className={styles.btn}
      >Add transaction</Button>

    </form>
  )
}
