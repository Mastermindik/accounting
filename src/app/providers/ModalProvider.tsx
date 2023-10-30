"use client"

import ModalEditTransaction from "../components/transactions/modalEditTransaction/ModalEditTransaction";
import { useAppSelector } from "../hooks/ReduxHooks"

export default function ModalProvider() {
  const { show } = useAppSelector(state => state.modal)

  return (
    <>
      {show && <ModalEditTransaction />}
    </>
  )
}
