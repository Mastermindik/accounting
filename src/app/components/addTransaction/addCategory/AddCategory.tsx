import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./AddCategory.module.scss"
import * as yup from "yup";
import { FormControl, FormHelperText, RadioGroup, FormControlLabel, Radio, TextField, Button } from "@mui/material";
import { useAddCategoryMutation } from "@/app/store/api/category.endpoint";
import { useEffect } from "react";

type Inputs = yup.InferType<typeof schema>

const schema = yup.object({
  type: yup.string().required("Please chose type"),
  name: yup.string().required("Please set name").min(3, "Minimum 3 symbols").max(20, "Maximum 20 symbols")
});

export default function AddCategory() {
  const [addCategory, addCategoryResult] = useAddCategoryMutation();

  const { control, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { type: "", name: "" }
  });

  useEffect(() => {
    if (addCategoryResult.isSuccess) {
      reset();
    }
  }, [addCategoryResult])

  const handleAdd: SubmitHandler<Inputs> = (data) => {
    addCategory(data);
  }

  return (
    <form className={styles.add_form}
      noValidate
      onSubmit={handleSubmit(handleAdd)}
      data-aos="fade-left"
    >

      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            fullWidth
            label="Name"
            variant='outlined'
            error={!!errors.name}
            helperText={errors.name?.message ? errors.name.message : " "} />
        )}
      />

      <Controller
        name='type'
        control={control}
        render={({ field }) => (
          <FormControl required fullWidth error={!!errors.type} >
            <RadioGroup
              {...field}
              row
            >
              <FormControlLabel value="income" control={<Radio />} label="Income" />
              <FormControlLabel value="expense" control={<Radio />} label="Expense" />
            </RadioGroup>
            <FormHelperText error>
              {errors.type?.message ? errors.type.message : " "}
            </FormHelperText>
          </FormControl>
        )}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        className={styles.btn}
      >Create category</Button>


    </form>
  )
}
