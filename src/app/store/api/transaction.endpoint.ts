import { IAddTransaction, ITransaction } from "@/app/models/ITransaction";
import { api } from "./api";
import { IAppSuccess } from "@/app/models/IAppSuccess";
import { IEditTransaction } from "@/app/models/IEditTransaction";
import { errorHandling } from "./errorHandling";
import { updateSuccess } from "../response.slice";

export const transactionEndpoint = api.injectEndpoints({
  endpoints: builder => ({
    getAllTransactions: builder.query<ITransaction[], number>({
      query: (page) => ({
        url: `/transactions/all/${page}`,
      }),
      providesTags: ["AllTransactions"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
    addTransaction: builder.mutation<IAppSuccess, IAddTransaction>({
      query: (body) => ({
        url: "/transactions/add",
        body,
        method: "POST",
      }),
      invalidatesTags: ["AllTransactions", "Budget", "CuttentMonth", "CuttentWeek", "LastMonth", "LastWeek", "Transactions"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled
        dispatch(updateSuccess(data.message))

        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
    deleteTransaction: builder.mutation<IAppSuccess, number>({
      query: (id) => ({
        url: `/transactions/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllTransactions", "Budget", "CuttentMonth", "CuttentWeek", "LastMonth", "LastWeek", "Transactions"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled
        dispatch(updateSuccess(data.message))

        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
    editTransaction: builder.mutation<IAppSuccess, IEditTransaction>({
      query: (body) => ({
        url: "/transactions/edit",
        body,
        method: "PATCH",
      }),
      invalidatesTags: ["AllTransactions", "Budget", "CuttentMonth", "CuttentWeek", "LastMonth", "LastWeek", "Transactions"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled
        dispatch(updateSuccess(data.message))

        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    })
  })
})

export const { useGetAllTransactionsQuery, useAddTransactionMutation, useDeleteTransactionMutation, useEditTransactionMutation } = transactionEndpoint