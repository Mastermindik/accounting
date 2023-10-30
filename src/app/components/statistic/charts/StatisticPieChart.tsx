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

type StatisticPieChartProps = {
  statistic: { [key: string]: number },
  donut: boolean,
  period: string
}

export default function StatisticPieChart({ statistic, period, donut }: StatisticPieChartProps) {
  const { theme } = useAppSelector(state => state.theme);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const color = theme === "dark" ? "#fff" : theme === "light"? "#1A202E" : prefersDarkMode ? "#fff" : "#1A202E";

  const sum: string = Object.values(statistic).reduce((e, acc) => acc += e, 0).toFixed(2);
  const data = [];
  for (const key in statistic) {
    if (statistic.hasOwnProperty(key)) {
      data.push({ name: key, value: statistic[key] });
    }
  }

  const options: EChartsOption = {
    title: {
      text: `${period} - $ ${sum}`,
      left: 'center',
      top: "0",
      textStyle: {
        color: color
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
        type: "pie",
        radius: donut ? ['40%', '75%'] : "75%",
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: donut ? 10 : 0,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center',
        },
        tooltip: {
          show: true,
          formatter: '{b}:\n${c}, {d}%',
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
    <div ref={chartRef} style={{ width: '100%', height: '300px' }} data-aos="zoom-out" />
  )
}
