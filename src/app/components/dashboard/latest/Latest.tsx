import React from 'react'
import styles from "./Latest.module.scss"
import { ITransaction } from '@/app/models/ITransaction'
import TransactionDashboard from '../transactionDashboard/TransactionDashboard'

type LatestProps = {
  lastTransactions: ITransaction[]
}

export default function Latest({ lastTransactions }: LatestProps) {
  return (
    <div className={styles.latest} data-aos="fade-right">
      <div className={styles.name}>
        Latest Transactions
      </div>
      <div className={styles.transactions}>
        {lastTransactions.map(e =>
          <TransactionDashboard
            category={e.category}
            date={e.date}
            description={e.description}
            sum={e.sum}
            type={e.type}
            key={e.id} />)}
      </div>
    </div>
  )
}
