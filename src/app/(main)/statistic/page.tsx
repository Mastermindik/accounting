"use client"
import styles from "./page.module.scss"
import FiltersChart from "@/app/components/statistic/filters/FiltersChart";
import { useState } from "react";
import CurrentWeek from "@/app/components/statistic/currentWeek/CurrentWeek";
import LastWeek from "@/app/components/statistic/lastWeek/LastWeek";
import CurrentMonth from "@/app/components/statistic/currentMonth/CurrentMonth";
import LastMonth from "@/app/components/statistic/lastMonth/LastMonth";
import CurrentYear from "@/app/components/statistic/currentYear/CurrentYear";

export default function Statistic() {
  const [type, setType] = useState<"pie" | "bar">("pie");
  const [period, setPeriod] = useState<"currentWeek" | "lastWeek" | "currentMonth" | "lastMonth" | "year">("currentWeek");
  const [donut, setDonut] = useState<boolean>(true);

  const charts = {
    currentWeek: <CurrentWeek donut={donut} type={type} />,
    lastWeek: <LastWeek donut={donut} type={type} />,
    currentMonth: <CurrentMonth donut={donut} type={type} />,
    lastMonth: <LastMonth donut={donut} type={type} />,
    year: <CurrentYear donut={donut} type={type} />
  }

  return (
    <div className={styles.statistic}>
      <div className={styles.wrapper}>
        <FiltersChart
          period={period}
          setPeriod={setPeriod}
          type={type}
          setType={setType}
          donut={donut}
          setDonut={setDonut}
        />
        <div className={styles.charts}>
          {charts[period]}
        </div>
      </div>
    </div>
  )
}
