import { ICategories } from "@/app/models/ICategories";
import { api } from "./api";
import { IAddCategory } from "@/app/models/IAddCategory";
import { ICustomCategory } from "@/app/models/ICustomCategory";
import { IAppSuccess } from "@/app/models/IAppSuccess";
import { updateSuccess } from "../response.slice";
import { errorHandling } from "./errorHandling";

export const categoryEndpoint = api.injectEndpoints({
  endpoints: builder => ({
    getAllCategories: builder.query<ICategories, void>({
      query: () => ({
        url: "/categories/all",
      }),
      providesTags: ["AllCategories"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
    getAllCustomCategories: builder.query<ICustomCategory[], void>({
      query: () => ({
        url: "/categories/allCustom",
      }),
      providesTags: ["CustomCategories"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
    addCategory: builder.mutation<IAppSuccess, IAddCategory>({
      query: (body) => ({
        url: "/categories/add",
        body,
        method: "POST",
      }),
      invalidatesTags: ["CustomCategories", "AllCategories"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled
        dispatch(updateSuccess(data.message))

        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
    deleteCategory: builder.mutation<IAppSuccess, number>({
      query: (id) => ({
        url: `/categories/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CustomCategories", "AllCategories"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled
        dispatch(updateSuccess(data.message))
      
        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    })
  })
})

export const { useGetAllCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation, useGetAllCustomCategoriesQuery } = categoryEndpoint