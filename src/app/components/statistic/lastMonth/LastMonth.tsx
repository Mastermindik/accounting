import { useGetLastMonthStatisticQuery } from '@/app/store/api/statistic.endpoint';
import React from 'react'
import StatisticBarChart from '../charts/StatisticBarChart';
import StatisticPieChart from '../charts/StatisticPieChart';

type LastMonthProps = {
  type: "bar" | "pie",
  donut: boolean
}

export default function LastMonth({ donut, type }: LastMonthProps) {
  const { currentData: lastMonth = { expenses: {}, incomes: {} } } = useGetLastMonthStatisticQuery();

  const types = {
    pie: <>
      <StatisticPieChart statistic={lastMonth?.incomes} period="Last month incomes" donut={donut} />
      <StatisticPieChart statistic={lastMonth?.expenses} period="Last month expenses" donut={donut} />
    </>,
    bar: <>
      <StatisticBarChart statistic={lastMonth?.incomes} period="Last month incomes" />
      <StatisticBarChart statistic={lastMonth?.expenses} period="Last month expenses" />
    </>
  }

  return (
    <>{types[type]}</>
  )
}
