// "use client"
import { EChartsOption } from "echarts"
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  GridComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { useRef, useEffect } from "react";
import moment from "moment";
import { IStatistic } from "@/app/models/IStatistic";
import { useAppSelector } from "@/app/hooks/ReduxHooks";
import { useMediaQuery } from "@mui/material";

echarts.use([
  TooltipComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
  LabelLayout,
  GridComponent,
  TitleComponent
]);

type HalfYearChartProps = {
  transactions: IStatistic[]
}

export default function HalfYearChart({ transactions }: HalfYearChartProps) {
  const xData: string[] = [];
  const today = moment();
  xData.push(today.format('MMM'));

  const dataIncomes: number[] = [];
  const dataExpenses: number[] = [];

  const { theme } = useAppSelector(state => state.theme);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const color = theme === "dark" ? "#fff" : theme === "light"? "#1A202E" : prefersDarkMode ? "#fff" : "#1A202E";

  for (let i = 0; i < transactions.length; i++) {
    const el = transactions[i];
    dataIncomes.push(Object.values(el.incomes).reduce((e, acc) => acc += e, 0));
    dataExpenses.push(Object.values(el.expenses).reduce((e, acc) => acc += e, 0));
  }

  for (let i = 1; i <= 5; i++) {
    const lastMonth = today.subtract(1, 'months');
    xData.push(lastMonth.format('MMM'));
  }

  const options: EChartsOption = {
    title: {
      text: "Report",
      left: "center",
      textStyle: {
        color: color
      }
    },
    legend: {
      show: true,
      orient: "horizontal",
      bottom: "5%",
      textStyle: {
        color: color
      }
    },
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: xData.reverse()
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        name: "Expenses",
        data: dataExpenses
      },
      {
        type: 'bar',
        name: "Incomes",
        data: dataIncomes
      }
    ]
  }

  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption(options);

      return () => {
        chart.dispose();
      };
    }
  }, [options]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '260px' }} />
  )
}

