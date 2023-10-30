import React from 'react'
import styles from "./TotalBalance.module.scss"
import { Button } from '@mui/material'
import { ITransaction } from '@/app/models/ITransaction'

type TotalBalanceProps = {
  total: number,
  // last: number,
  // type: "income" | "expence"
  transaction: ITransaction
}

const types = {
  income: styles.income,
  expense: styles.expence
}

export default function TotalBalance({ total, transaction }: TotalBalanceProps) {
  return (
    <div className={styles.total_balance} data-aos="fade-right">
      <div className={styles.left}>
        <div className={styles.name}>
          Total Ballance
        </div>
        <div className={styles.last}>
          <div className={`${styles.sum} ${types[transaction?.type]}`}>
            {!transaction ? "$0" : transaction?.type === "income" ? 
            `+ $${transaction?.sum.toFixed(2)}` : 
            `- $${transaction?.sum.toFixed(2)}`}
          </div>
          <div className={styles.descr}>
            Last Transaction
          </div>
        </div>
        <div className={styles.buttons}>
          <Button variant='contained'>top up</Button>
          <Button variant='outlined'>widthdraw</Button>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.sum}>
          ${total.toFixed(0)}.
          <span>{total.toFixed(2).substring(total.toFixed(2).length - 2)}</span>
        </div>
        <div className={styles.wallet}>
          wallets amount
        </div>
      </div>
    </div>
  )
}
