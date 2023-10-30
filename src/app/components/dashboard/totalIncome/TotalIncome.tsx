import React from 'react'
import styles from "./TotalIncome.module.scss"
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

type TotalIncomeProps = {
  total: number,
  percent: number
}

export default function TotalIncome({ percent, total }: TotalIncomeProps) {
  return (
    <div className={styles.total_income} data-aos="fade-right">
      <div className={styles.name}>
        Total Income
      </div>
      <div className={styles.sum}>
        $ {total}
      </div>
      <div className={styles.percent}>
        <TrendingUpIcon />
        {percent}%
        {/* переробить щоб з мінусом буто також */}
      </div>
    </div>
  )
}
