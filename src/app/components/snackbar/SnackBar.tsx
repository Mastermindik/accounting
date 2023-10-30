"use client"
import { UseActions } from "@/app/hooks/UseActions";
import { useAppSelector } from "@/app/hooks/ReduxHooks";
import { Snackbar, Alert, Slide } from "@mui/material";

export default function SnackBar() {
  const response = useAppSelector(state => state.response);
  const { closeAlert } = UseActions();

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    closeAlert();
  }

  return (
      <Snackbar open={response.show} autoHideDuration={6000} onClose={handleClose} data-aos="fade-right">
        <Alert severity={response.severity} onClose={handleClose} sx={{ width: '100%' }}>
          {response.message}
        </Alert>
      </Snackbar>
  )
}
