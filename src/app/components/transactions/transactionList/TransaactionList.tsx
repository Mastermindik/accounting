import { ITransaction } from "@/app/models/ITransaction"
import styles from "./TransactionList.module.scss"
import TransactionItem from "../transactionItem/TransactionItem"
import InfiniteScroll from "react-infinite-scroll-component"
import { CircularProgress } from "@mui/material"
import { useDeleteTransactionMutation, useGetAllTransactionsQuery } from "@/app/store/api/transaction.endpoint"
import { useEffect, useState } from "react"

type TransaactionListProps = {
  transactions: ITransaction[],
  type: "income" | "expense" | "all",
  category: string,
  search: string
}

export default function TransaactionList({ category, type, search }: TransaactionListProps) {
  const [page, setPage] = useState<number>(0);
  const [needUpdate, setNeedUpdate] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<ITransaction[]>([]);
  const { data: transactions = [], } = useGetAllTransactionsQuery(page);
  const [deleteTransaction, deleteTransactionResult] = useDeleteTransactionMutation();

  useEffect(() => {
    if (needUpdate) {
      setCurrentData(state => state.filter(e => e.id !== deleteTransactionResult.originalArgs));
      setNeedUpdate(false);
    } else if (transactions.length && page === 0) {
      setCurrentData(transactions)
    }
  }, [transactions])
  
  useEffect(() => {
    setCurrentData(state => [...state, ...transactions])
  }, [page])
  
  useEffect(() => {
    if (deleteTransactionResult.isSuccess) {
      setNeedUpdate(true);
    }
  }, [deleteTransactionResult])


  const fetchMore = () => {
    if (transactions.length === 5) {
      setPage(page + 1);
    }
  }

  return (
    <div className={styles.transactions_list} data-aos="fade-up">
      <div className={styles.name}>
        Your Transactions:
      </div>
      <InfiniteScroll
        className={styles.list_wrapper}
        dataLength={currentData.length}
        loader={<CircularProgress color="success" />}
        hasMore={transactions.length === 5}
        next={fetchMore} >
        {currentData
          .filter(e => type !== "all" ? e.type.includes(type) : true)
          .filter(e => e.category.includes(category))
          .filter(e => e.description?.toLocaleLowerCase().trim().includes(search.toLowerCase().trim()))
          .map(e =>
            <TransactionItem
              category={e.category}
              date={e.date}
              description={e.description}
              sum={e.sum}
              type={e.type}
              id={e.id}
              deleteTransaction={deleteTransaction}
              key={e.id}
            />)}

      </InfiniteScroll>
    </div>
  )
}
