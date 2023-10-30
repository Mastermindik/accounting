import { useMemo } from "react";
import { useAppDispatch } from "./ReduxHooks"
import { bindActionCreators } from "@reduxjs/toolkit";
import { actions } from "../store/response.slice";
import { themeActions } from "../store/theme.slice";
import { modalActions } from "../store/modal.slice";

const rootActions = {
  ...actions,
  ...themeActions,
  ...modalActions
}

export const UseActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => 
  bindActionCreators(rootActions, dispatch), [dispatch])
}