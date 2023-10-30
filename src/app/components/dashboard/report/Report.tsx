import React from 'react'
import styles from "./Report.module.scss"
import HalfYearChart from '../expensesChart/HalfYearChart'
import { IStatistic } from '@/app/models/IStatistic'

type ReportProps = {
  transactions: IStatistic[]
}

export default function Report({ transactions }: ReportProps) {
  return (
    <div className={styles.report} data-aos="fade-left">
      <HalfYearChart transactions={transactions} />
    </div>
  )
}
