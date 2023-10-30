import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div style={{height: "100%",display: "flex", justifyContent: "center", alignItems: "center", gap: ".7rem"}}>
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
    </div>
  )
}
