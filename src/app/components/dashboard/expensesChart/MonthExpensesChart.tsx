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
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { useRef, useEffect } from "react";
import { useAppSelector } from "@/app/hooks/ReduxHooks";
import { useMediaQuery } from "@mui/material";

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  TitleComponent,

]);

type MonthExpensesChartProps = {
  statistic: { [key: string]: number }
}

export default function MonthExpensesChart({ statistic }: MonthExpensesChartProps) {
  const { theme } = useAppSelector(state => state.theme);
  const expensesSum: string = Object.values(statistic).reduce((e, acc) => acc += e, 0).toFixed(2);
  const data = [];
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const color = theme === "dark" ? "#fff" : theme === "light"? "#1A202E" : prefersDarkMode ? "#fff" : "#1A202E";

  for (const key in statistic) {
    if (statistic.hasOwnProperty(key)) {
      data.push({ name: key, value: statistic[key] });
    }
  }

  const options: EChartsOption = {
    title: {
      text: `Spend this month - $${expensesSum}`,
      left: "0",
      top: "0",
      textStyle: {
        color: color,
        fontSize: "1.25rem",
        fontWeight: "bold"
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: "vertical",
      bottom: 'center',
      right: "1%",
      textStyle: {
        color: color
      }
    },
    series: [
      {
        type: 'pie',
        center: data.length > 5 ? ["20%", "50%"] : ["40%", "50%"],
        radius: ['50%', '60%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center',          
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
        labelLine: {
          show: false
        },
        data: data
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
    <div ref={chartRef} style={{ width: '100%', height: '300px' }} />
  )
}
