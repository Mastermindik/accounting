import { useGetCurrentWeekStatisticQuery } from '@/app/store/api/statistic.endpoint';
import React from 'react'
import StatisticPieChart from '../charts/StatisticPieChart';
import StatisticBarChart from '../charts/StatisticBarChart';

type CurrentWeekProps = {
  type: "bar" | "pie",
  donut: boolean
}

export default function CurrentWeek({ donut, type }: CurrentWeekProps) {

  const { currentData: currentWeek = {expenses: {}, incomes: {}} } = useGetCurrentWeekStatisticQuery();

  const types = {
    pie: <>
      <StatisticPieChart statistic={currentWeek?.incomes} period="Current week incomes" donut={donut} />
      <StatisticPieChart statistic={currentWeek?.expenses} period="Current week expenses" donut={donut} />
    </>,
    bar: <>
      <StatisticBarChart statistic={currentWeek?.incomes} period="Current week incomes" />
      <StatisticBarChart statistic={currentWeek?.expenses} period="Current week expenses" />
    </>
  }
  
  return (
    <>{types[type]}</>
  )
}
