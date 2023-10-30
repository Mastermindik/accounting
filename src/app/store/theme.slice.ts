import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface ThemeState {
  theme: string | null
}

const initialState: ThemeState = {
  theme: ""
}

export const themeslice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, { payload }: PayloadAction<string | null>) => {
      state.theme = payload;
    }
  }
})

export const themeActions = themeslice.actions

// export const { actions, reducer } = themeslice

export const theme = themeslice.reducer