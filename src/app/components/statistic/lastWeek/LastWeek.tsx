import { useGetLastWeekStatisticQuery } from '@/app/store/api/statistic.endpoint';
import StatisticBarChart from '../charts/StatisticBarChart';
import StatisticPieChart from '../charts/StatisticPieChart';

type LastWeekProps = {
  type: "bar" | "pie",
  donut: boolean
}

export default function LastWeek({donut, type}: LastWeekProps) {
  const { currentData: lastWeek = {expenses: {}, incomes: {}} } = useGetLastWeekStatisticQuery();

  const types = {
    pie: <>
      <StatisticPieChart statistic={lastWeek?.incomes} period="Last week incomes" donut={donut} />
      <StatisticPieChart statistic={lastWeek?.expenses} period="Last week expenses" donut={donut} />
    </>,
    bar: <>
      <StatisticBarChart statistic={lastWeek?.incomes} period="Last week incomes" />
      <StatisticBarChart statistic={lastWeek?.expenses} period="Last week expenses" />
    </>
  }
  
  return (
    <>{types[type]}</>
  )
}
