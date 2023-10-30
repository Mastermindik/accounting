import React from 'react'
import styles from "./ThisMonth.module.scss"
import MonthExpensesChart from '../expensesChart/MonthExpensesChart'

type ThisMonthProps = {
  statistic: {[key: string]: number}
}

export default function ThisMonth({ statistic }: ThisMonthProps) {
  return (
    <div className={styles.this_month} data-aos="fade-left">
      {/* <div className={styles.name}>
        Spending This Month
      </div> */}
      <MonthExpensesChart statistic={statistic} />
    </div>
  )
}
