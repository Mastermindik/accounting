"use client"
import { useEffect } from "react"
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AosProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    AOS.init({
      offset: 0
    });
  }, [])

  return (
    <div>{children}</div>
  )
}
