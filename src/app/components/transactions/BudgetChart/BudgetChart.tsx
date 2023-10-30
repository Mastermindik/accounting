import { EChartsOption } from "echarts"
import styles from "./BudgetChart.module.scss"
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
  TitleComponent
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { useRef, useEffect } from "react";
import { IBudget } from "@/app/models/IBudget";
import { useAppSelector } from "@/app/hooks/ReduxHooks";
import { useMediaQuery } from "@mui/material";

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  TitleComponent
]);

type BudgetChartProps = {
  budget: IBudget
}

export default function BudgetChart({ budget }: BudgetChartProps) {
  const { theme } = useAppSelector(state => state.theme);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const color = theme === "dark" ? "#fff" : theme === "light"? "#1A202E" : prefersDarkMode ? "#fff" : "#1A202E";


  const options: EChartsOption = {
    title: {
      text: "Total Budget:",
      left: "10%",
      textStyle: {
        color: color
      }
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      right: '5%',
      bottom: "center",
      orient: "vertical",
      textStyle: {
        color: color
      }
    },
    series: [
      {
        type: 'pie',
        radius: "75%",
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          color: color
        },
        tooltip: {
          show: true,
          formatter: '{b}:\n{c}, {d}%',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
          }
        },
        data: [
          { value: budget.incomes, name: 'Incomes' },
          { value: budget.expenses, name: 'Expenses' },
        ]
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
    <div ref={chartRef} style={{ width: '100%', height: '15rem' }} />
  )
}
