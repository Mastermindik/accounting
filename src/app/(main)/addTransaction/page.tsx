"use client"
import AddForm from "@/app/components/addTransaction/addForm/AddForm"
import styles from "./page.module.scss"
import AddCategory from "@/app/components/addTransaction/addCategory/AddCategory";
import CustomCategoriesList from "@/app/components/addTransaction/customCategoriesList/CustomCategoriesList";
import { useGetAllCategoriesQuery, useGetAllCustomCategoriesQuery } from "@/app/store/api/category.endpoint";
import { useGetAllTransactionsQuery } from "@/app/store/api/transaction.endpoint";
import LastTransaction from "@/app/components/addTransaction/lastTransaction/LastTransaction";
import { defaultCategories } from "@/app/models/ICategories";

export default function AddTransaction() {
  const { currentData: customCategories = [] } = useGetAllCustomCategoriesQuery();
  const { currentData: categories = defaultCategories } = useGetAllCategoriesQuery();
  const { currentData: transactions = [] } = useGetAllTransactionsQuery(0);

  return (
    <div className={styles.add_transaction}>
      <AddForm categories={categories} />
      <div className={styles.options}>
        <CustomCategoriesList customCategories={customCategories} />
        <AddCategory />
        <LastTransaction transaction={transactions[0]} />
      </div>
    </div>
  )
}

