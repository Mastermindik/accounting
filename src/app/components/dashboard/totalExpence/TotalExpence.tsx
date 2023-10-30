import React from 'react'
import styles from "./TotalExpence.module.scss"
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

type TotalExpenceProps = {
  total: number,
  percent: number
}

export default function TotalExpence({ percent, total }: TotalExpenceProps) {
  return (
    <div className={styles.total_expence} data-aos="fade-left">
      <div className={styles.name}>
        Total Expence
      </div>
      <div className={styles.sum}>
        $ {total}
      </div>
      <div className={styles.percent}>
        <TrendingUpIcon />
        + {percent}%
      </div>
    </div>
  )
}
