import { AlertColor } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface ModalState {
  show: boolean,
  id: number,
  description?: string,
  sum: number,
  transactionDate: string | null
}

const initialState: ModalState = {
  show: false,
  id: 0,
  description: "",
  sum: 0,
  transactionDate: ""
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload }: PayloadAction<Omit<ModalState, "show">>) => {
      state.show = true;
      state.description = payload.description;
      state.sum = payload.sum;
      state.transactionDate = payload.transactionDate;
      state.id = payload.id
    },
    closeModal: (state, { payload }: PayloadAction<void>) => {
      state.show = false;
    }
  }
})

export const modalActions = modalSlice.actions

export const modal = modalSlice.reducer