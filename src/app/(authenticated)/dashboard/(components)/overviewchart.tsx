// import { OverviewChart } from "@/types/dashboard"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface DashboardProps {
  data: []
}

export function OverviewChart(props: DashboardProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={props.data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: any) => value}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}