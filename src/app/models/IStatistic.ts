export interface IStatistic {
  expenses: {[key: string]: number},
  incomes: {[key: string]: number}
}

export const defaultStatistic: IStatistic = {
  expenses: {},
  incomes: {}
}