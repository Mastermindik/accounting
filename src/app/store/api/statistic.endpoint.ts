import { IStatistic } from "@/app/models/IStatistic";
import { api } from "./api";
import { errorHandling } from "./errorHandling";

export const statisticEndpoint = api.injectEndpoints({
  endpoints: builder => ({
    getCurrentWeekStatistic: builder.query<IStatistic, void>({
      query: () => ({
        url: "/statistic/currentWeek",
      }),
      providesTags: ["CuttentWeek"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
    getLastWeekStatistic: builder.query<IStatistic, void>({
      query: () => ({
        url: "/statistic/lastWeek",
      }),
      providesTags: ["LastWeek"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
    getCurrentMonthStatistic: builder.query<IStatistic, void>({
      query: () => ({
        url: "/statistic/currentMonth",
      }),
      providesTags: ["CuttentMonth"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
    getLastMonthStatistic: builder.query<IStatistic, void>({
      query: () => ({
        url: "/statistic/lastMonth",
      }),
      providesTags: ["LastMonth"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    }),
    getCurrentYearStatistic: builder.query<IStatistic[], void>({
      query: () => ({
        url: "/statistic/currentYear",
      }),
      providesTags: ["Transactions"],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        queryFulfilled.catch((e) => errorHandling(e, dispatch))
      },
    })
  })
})

export const { useGetCurrentWeekStatisticQuery, useGetLastWeekStatisticQuery, useGetCurrentMonthStatisticQuery, useGetLastMonthStatisticQuery, useGetCurrentYearStatisticQuery } = statisticEndpoint