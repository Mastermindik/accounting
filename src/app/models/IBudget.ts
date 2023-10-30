export interface IBudget {
  total: number,
  incomes: number,
  expenses: number,
  increaseIncomes: number,
  increaseExpenses: number,
}

export const defaultBudget: IBudget = {
  total: 0,
  expenses: 0,
  incomes: 0,
  increaseIncomes: 0,
  increaseExpenses: 0
}