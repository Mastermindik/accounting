import styles from "./TransactionItem.module.scss"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import { useDeleteTransactionMutation } from "@/app/store/api/transaction.endpoint";
import { UseActions } from "@/app/hooks/UseActions";

type TransactionItemProps = {
  id: number,
  description?: string,
  sum: number,
  category: string,
  type: "income" | "expense",
  date: string | null,
  deleteTransaction: Function,
}

const types = {
  income: styles.income,
  expense: styles.expence
}

const typesArrow = {
  income: <ArrowUpwardIcon className={styles.arrow} />,
  expense: <ArrowDownwardIcon className={styles.arrow} />
}

export default function TransactionItem({ category, description, sum, type, date, id, deleteTransaction }: TransactionItemProps) {
  // const [deleteTransaction, {requestId, originalArgs, endpointName}] = useDeleteTransactionMutation();
  const { openModal } = UseActions();
  // console.log(requestId, originalArgs, endpointName);
  

  const showEditModal = () => {
    openModal({id, description, sum, transactionDate: date})
  }

  return (
    <div className={styles.card} data-aos="flip-up">
      <div className={styles.title}>
        <div className={`${styles.type_arrow} ${types[type]}`}>
          {typesArrow[type]}
        </div>
        <div className={styles.names}>
          <div className={styles.category}>
            {category}
          </div>
          <div className={styles.type}>
            {type}
          </div>
        </div>
        <div className={`${styles.sum} ${types[type]}`}>
          {type === "income" ? `+$${sum.toFixed(2)}` : `-$${sum.toFixed(2)}`}
        </div>
        <div className={styles.buttons}>
          <IconButton className={styles.icon_btn} onClick={() => deleteTransaction(id)} >
            <DeleteIcon className={styles.icon} />
          </IconButton>
          <IconButton className={styles.icon_btn} onClick={showEditModal}>
            <ModeIcon className={styles.icon} />
          </IconButton>
        </div>
      </div>
      <div className={styles.content}>
        {description}
      </div>
      <div className={styles.date}>
        {date}
      </div>
    </div>
  )
}
