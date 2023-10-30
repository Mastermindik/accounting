export interface ITransaction {
  id: number,
  type: "income" | "expense",
  description?: string,
  sum: number,
  category: string,
  date: string | null
}

export interface IAddTransaction extends Omit<ITransaction, "id"> {}