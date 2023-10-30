import styles from "./TransactionDashboard.module.scss"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

type TransactionDashboardProps = {
  description?: string,
  sum: number,
  category: string,
  type: "income" | "expense",
  date: string | null
}

const types = {
  income: styles.income,
  expense: styles.expence
}

export default function TransactionDashboard({ description, sum, category, type, date}: TransactionDashboardProps) {
  return (
    <div className={styles.transaction} >
      <div className={`${styles.type_arrow} ${types[type]}`}>
        {type === "income" ? 
        <ArrowUpwardIcon className={styles.arrow} /> : 
        <ArrowDownwardIcon className={styles.arrow} />}
      </div>
      <div className={styles.description}>
        <div className={styles.name}>
          {description}
        </div>
        <div className={styles.category}>
          {category}
        </div>
      </div>
      <div className={`${styles.sum} ${types[type]}`}>
        {type === "income" ? `+$${sum.toFixed(2)}` : `-$${sum.toFixed(2)}`}
      </div>
    </div>
  )
}
