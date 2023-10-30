import { IAppError } from '@/app/models/IAppError';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Budget", "CuttentWeek", "LastWeek", "CuttentMonth", "LastMonth", "AllTransactions", "Transactions", "CustomCategories", "AllCategories"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
    prepareHeaders: (headers) => {
      const JWTToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwt-token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      
      if (JWTToken?.length) {
        headers.set("Authorization", "Bearer " + JWTToken);
      }
    },
    mode: "cors",
  }) as BaseQueryFn<string | FetchArgs, unknown, /* FetchBaseQueryError */ IAppError, {}, FetchBaseQueryMeta>,
  endpoints: builder =>({
    getCities: builder.query<string[], void>({
      query: () => "/cities"
    })
    //це не працює
  })
})

export const {useGetCitiesQuery} = api;