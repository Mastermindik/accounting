import { AlertColor } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface ResponseState {
  message?: string,
  isError: boolean,
  show: boolean,
  severity: AlertColor
}

const initialState: ResponseState = {
  message: "",
  isError: false,
  show: false,
  severity: "success"
}

export const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    updateError: (state, { payload }: PayloadAction<string | undefined>) => {
      state.message = payload;
      state.isError = true;
      state.show = true;
      state.severity = "error"
    },
    updateSuccess: (state, { payload }: PayloadAction<string>) => {
      state.message = payload;
      state.isError = false;
      state.show = true;
      state.severity = "success"
    },
    closeAlert: (state) => {
      state.show = false;
    }
  }
})

export const { updateError, updateSuccess, closeAlert } = responseSlice.actions

export const {actions, reducer} = responseSlice

export const response = responseSlice.reducer