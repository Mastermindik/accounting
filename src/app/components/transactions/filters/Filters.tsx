import styles from "./Filters.module.scss"

import { FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { ICategories } from "@/app/models/ICategories";
import { Dispatch, SetStateAction } from "react";

type Filtersprops = {
  categories: ICategories,
  type: "income" | "expense" | "all",
  setType: Dispatch<SetStateAction<"income" | "expense" | "all">>,
  category: string,
  setCategory: Dispatch<SetStateAction<string>>,
  search: string,
  setSearch: Dispatch<SetStateAction<string>>
}


export default function Filters({ categories, type, setType, category, search, setCategory, setSearch }: Filtersprops) {
  const categoryType = {
    income: categories.incomes,
    expense: categories.expenses,
    all: categories.incomes.concat(categories.expenses)
  }

  return (
    <div className={styles.filters} data-aos="fade-right">
      <FormControl fullWidth >
        <InputLabel >Search...</InputLabel>
        <OutlinedInput
          
          label="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          startAdornment={
            <InputAdornment position='start'>
              <SearchIcon className={styles.icon}  />
            </InputAdornment>
          } />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Show only</InputLabel>
        <Select
          label="Show only"
          value={type}
          onChange={(e) => setType(e.target.value as typeof type)}
          inputProps={{MenuProps: {disableScrollLock: true}}}
        >
          <MenuItem value={"all"} >All</MenuItem>
          <MenuItem value={"expense"} >Expenses</MenuItem>
          <MenuItem value={"income"} >Incomes</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Categories</InputLabel>
        <Select
          label="Categories"
          value={category}
          onChange={e => setCategory(e.target.value)}
          inputProps={{MenuProps: {disableScrollLock: true}}}
        >
          <MenuItem value={""} >All</MenuItem>
          {categoryType[type].map(e =>
            <MenuItem key={e} value={e} >{e}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  )
}
