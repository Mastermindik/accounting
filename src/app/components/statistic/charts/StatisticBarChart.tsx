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

type StatisticBarChartProps = {
  statistic: { [key: string]: number },
  period: string
}

export default function StatisticBarChart({ period, statistic }: StatisticBarChartProps) {
  const { theme } = useAppSelector(state => state.theme);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const color = theme === "dark" ? "#fff" : theme === "light"? "#1A202E" : prefersDarkMode ? "#fff" : "#1A202E";
  const sum: string = Object.values(statistic).reduce((e, acc) => acc += e, 0).toFixed(2);
  const xData: string[] = Object.keys(statistic);
  const data: number[] = Object.values(statistic);

  const options: EChartsOption = {
    title: {
      text: `${period} - $ ${sum}`,
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
      data: xData,
      axisLabel: {interval: 0, rotate: 30}
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        // name: "Expenses",
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
    <div ref={chartRef} style={{ width: '100%', height: '300px' }} data-aos="zoom-out" />
  )
}

