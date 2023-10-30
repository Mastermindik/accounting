"use client"
import styles from "./page.module.scss"
import TotalBalance from '@/components/dashboard/totalBalance/TotalBalance'
import Report from '@/components/dashboard/report/Report'
import TotalIncome from '@/components/dashboard/totalIncome/TotalIncome'
import TotalExpence from '@/components/dashboard/totalExpence/TotalExpence'
import Latest from '@/components/dashboard/latest/Latest'
import ThisMonth from '@/components/dashboard/thisMonth/ThisMonth'
import { useGetUserQuery } from '@/app/store/api/user.endpoint'
import { useGetAllTransactionsQuery } from '@/app/store/api/transaction.endpoint'
import { useGetCurrentMonthStatisticQuery, useGetCurrentYearStatisticQuery } from '@/app/store/api/statistic.endpoint'
import { defaultUser } from "@/app/models/IUser"
import { defaultStatistic } from "@/app/models/IStatistic"

export default function Dashboard() {
  const { currentData: user = defaultUser} = useGetUserQuery();
  const { currentData: transactions = [] } = useGetAllTransactionsQuery(0);
  const { currentData: monthStatistic = defaultStatistic} = useGetCurrentMonthStatisticQuery();
  const { currentData: halfYearStatistic = [] } = useGetCurrentYearStatisticQuery();

  return (
    <main className={styles.dashboard}>
      {true ?
        <>
          <TotalBalance
            total={user.budget.total}
            transaction={transactions[0]}
          />
          <Report transactions={halfYearStatistic} />
          <TotalIncome
            percent={user.budget.increaseIncomes}
            total={user.budget.incomes}
          />
          <TotalExpence
            percent={user.budget.increaseExpenses}
            total={user.budget.expenses}
          />
          <Latest lastTransactions={transactions.slice(0, 5)} />
          <ThisMonth statistic={monthStatistic?.expenses} />
        </> : ""}
    </main>
  )
}