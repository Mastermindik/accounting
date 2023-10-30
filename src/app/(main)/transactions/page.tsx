"use client"
import { useState } from 'react'
import styles from "./page.module.scss"
import Filters from '@/app/components/transactions/filters/Filters'
import BudgetChart from '@/app/components/transactions/BudgetChart/BudgetChart'
import { useGetAllCategoriesQuery } from '@/app/store/api/category.endpoint'
import TransaactionList from '@/app/components/transactions/transactionList/TransaactionList'
import { useGetAllTransactionsQuery } from '@/app/store/api/transaction.endpoint'
import { useGetUserQuery } from '@/app/store/api/user.endpoint'
import { defaultCategories } from '@/app/models/ICategories'
import { defaultUser } from '@/app/models/IUser'

export default function Transactions() {
  const { currentData: categories = defaultCategories } = useGetAllCategoriesQuery();
  const { currentData: transactions = [] } = useGetAllTransactionsQuery(0);
  const { currentData: user= defaultUser } = useGetUserQuery();
  const [type, setType] = useState<"income" | "expense" | "all">("all");
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  return (
    <main className={styles.transactions}>
      {categories && transactions && user ?
        <>
          <Filters
            categories={categories}
            type={type}
            setType={setType}
            category={category}
            search={search}
            setCategory={setCategory}
            setSearch={setSearch} />
          <div className={styles.chart} data-aos="fade-left">
            <BudgetChart budget={user.budget} />
          </div>
          <TransaactionList
            transactions={transactions}
            category={category}
            type={type}
            search={search} />
        </>
        : ""}

    </main>
  )
}
