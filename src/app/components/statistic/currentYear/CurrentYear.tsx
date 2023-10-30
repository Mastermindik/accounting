import { useGetCurrentYearStatisticQuery } from '@/app/store/api/statistic.endpoint';
import React from 'react'
import StatisticBarChart from '../charts/StatisticBarChart';
import StatisticPieChart from '../charts/StatisticPieChart';
import HalfYearChart from '../../dashboard/expensesChart/HalfYearChart';

type CurrentYearProps = {
  type: "bar" | "pie",
  donut: boolean
}

export default function CurrentYear({ donut, type }: CurrentYearProps) {
  const { currentData: currentYear = [] } = useGetCurrentYearStatisticQuery();
  const types = {
    pie: <>
      <HalfYearChart transactions={currentYear} />
      {/* <StatisticPieChart statistic={currentYear?.incomes} period="Current year incomes" donut={donut} />
      <StatisticPieChart statistic={currentYear?.expenses} period="Current year expenses" donut={donut} /> */}
    </>,
    bar: <>
    <HalfYearChart transactions={currentYear} />
      {/* <StatisticBarChart statistic={currentYear?.incomes} period="Current year incomes" />
      <StatisticBarChart statistic={currentYear?.expenses} period="Current year expenses" /> */}
    </>
  }

  return (
    <>{types[type]}</>
  )
}
