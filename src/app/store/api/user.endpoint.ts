import { IUser } from "@/app/models/IUser";
import { api } from "./api";
import { ILoginUser, IRegisterUser } from "@/app/models/IAuthUser";
import { IToken } from "@/app/models/IToken";
import { IAppSuccess } from "@/app/models/IAppSuccess";
import { IUpdateUser } from "@/app/models/IUpdateUser";
import { errorHandling } from "./errorHandling";
import { updateSuccess } from "../response.slice";

// Встановлення кукі
function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));

  const cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;

  document.cookie = cookie;
}

export const userEndpoint = api.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<IUser, void>({
      query: () => ({
        url: "/user/current",
      }),
      providesTags: ["Budget"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
    loginUser: builder.mutation<IToken, ILoginUser>({
      query: (body) => ({
        url: "user/login",
        body,
        method: "POST",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        setCookie("jwt-token", data.token, 30);

        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
    registerUser: builder.mutation<IToken, IRegisterUser>({
      query: (body) => ({
        url: "user/register",
        body,
        method: "POST",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        setCookie("jwt-token", data.token, 30);

        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "user/logout",
        method: "POST",
      })
    }),
    updateUserPhoto: builder.mutation<IAppSuccess, any>({
      query: (body) => ({
        url: "user/updateAccountPicture",
        body,
        method: "PATCH",
      }),
      invalidatesTags: ["Budget"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled
        dispatch(updateSuccess(data.message))

        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
    updateUserInfo: builder.mutation<IAppSuccess, IUpdateUser>({
      query: (body) => ({
        url: "user/updateAccount",
        body,
        method: "PATCH",
      }),
      invalidatesTags: ["Budget"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled
        dispatch(updateSuccess(data.message))
  
        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
  })
})

export const { useGetUserQuery, useLoginUserMutation, useLogoutUserMutation, useRegisterUserMutation, useUpdateUserInfoMutation, useUpdateUserPhotoMutation } = userEndpoint