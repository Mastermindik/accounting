import { IBudget, defaultBudget } from "./IBudget";

export interface IUser {
  username: string,
  email: string,
  pictureUrl: string | null,
  roles: string,
  budget: IBudget
}

export const defaultUser: IUser = {
  username: "",
  email: "",
  pictureUrl: null,
  roles: "",
  budget: defaultBudget
}