import { FormControl, InputLabel, Select, MenuItem, FormControlLabel } from "@mui/material"
import styles from "./FiltersChart.module.scss"
import { Dispatch, SetStateAction } from "react"
import Switch from '@mui/material/Switch';

type FiltersChartProps = {
  type: "pie" | "bar",
  setType: Dispatch<SetStateAction<"pie" | "bar">>,
  period: "currentWeek" | "lastWeek" | "currentMonth" | "lastMonth" | "year",
  setPeriod: Dispatch<SetStateAction<"currentWeek" | "lastWeek" | "currentMonth" | "lastMonth" | "year">>,
  donut: boolean,
  setDonut: Dispatch<SetStateAction<boolean>>
}

export default function FiltersChart({ period, setPeriod, type, setType, donut, setDonut }: FiltersChartProps) {
  return (
    <div className={styles.filters_chart}>
      <FormControl fullWidth >
        <InputLabel >Select period</InputLabel>
        <Select
          value={period}
          label="Select period"
          onChange={(e) => setPeriod(e.target.value as typeof period)}
        >
          <MenuItem value={"currentWeek"}>Current Week</MenuItem>
          <MenuItem value={"lastWeek"}>Last Week</MenuItem>
          <MenuItem value={"currentMonth"}>Current Month</MenuItem>
          <MenuItem value={"lastMonth"}>Last Month</MenuItem>
          <MenuItem value={"year"}>Yearly</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel >Select type</InputLabel>
        <Select
          value={type}
          label="Select type"
          onChange={(e) => setType(e.target.value as typeof type)}
        >
          <MenuItem value={"pie"}>Pie</MenuItem>
          <MenuItem value={"bar"}>Bar</MenuItem>
        </Select>
      </FormControl>

      {type === "pie" ?
        <FormControl onClick={() => setDonut(state => !state)} >
          <FormControlLabel control={<Switch defaultChecked={donut} />} label="Doughnut" />
        </FormControl> :
        ""}
    </div>
  )
}
