import { useGetCurrentMonthStatisticQuery } from '@/app/store/api/statistic.endpoint';
import React from 'react'
import StatisticBarChart from '../charts/StatisticBarChart';
import StatisticPieChart from '../charts/StatisticPieChart';

type CurrentMonthProps = {
  type: "bar" | "pie",
  donut: boolean
}

export default function CurrentMonth({donut,type}:CurrentMonthProps) {
  const { currentData: currentMonth = {expenses: {}, incomes: {}} } = useGetCurrentMonthStatisticQuery();

  const types = {
    pie: <>
      <StatisticPieChart statistic={currentMonth?.incomes} period="Current month incomes" donut={donut} />
      <StatisticPieChart statistic={currentMonth?.expenses} period="Current month expenses" donut={donut} />
    </>,
    bar: <>
      <StatisticBarChart statistic={currentMonth?.incomes} period="Current month incomes" />
      <StatisticBarChart statistic={currentMonth?.expenses} period="Current month expenses" />
    </>
  }
  
  return (
    <>{types[type]}</>
  )
}
