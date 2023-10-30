import { ITransaction } from "@/app/models/ITransaction"
import TransactionDashboard from "../../dashboard/transactionDashboard/TransactionDashboard"
import styles from "./LastTransaction.module.scss"
import Link from "next/link"

type LastTransactionProps = {
  transaction: ITransaction
}

export default function LastTransaction({ transaction }: LastTransactionProps) {
  return (
    <Link href={"/transactions"} className={styles.last_transaction} data-aos="fade-left">
      {transaction?.category ?
        <TransactionDashboard
          category={transaction.category}
          date={transaction.date}
          sum={transaction.sum}
          type={transaction.type}
          description={transaction.description} /> : "You dont have last Transaction"}
    </Link>
  )
}
