import { updateError } from "../response.slice";
import { IAppError } from "@/app/models/IAppError";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { QueryFulfilledRejectionReason } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn, FetchArgs, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";

export const errorHandling = (error: QueryFulfilledRejectionReason<BaseQueryFn<string | FetchArgs, unknown, IAppError, {}, FetchBaseQueryMeta>>, dispatch: ThunkDispatch<any, any, AnyAction>) => {
  const appError = error.error as IAppError;
  if (appError.status === "FETCH_ERROR") {
    dispatch(updateError("Fetch Error"))
  } else if (appError.status === "PARSING_ERROR") {
    dispatch(updateError("Parsing Error"))
  } else if (appError.status === "TIMEOUT_ERROR") {
    dispatch(updateError("Timeout Error"))
  } else {
    dispatch(updateError(appError.data.message))
  }
}