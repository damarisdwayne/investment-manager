import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    entradas: 4000,
    saidas: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    entradas: 3000,
    saidas: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    entradas: 2000,
    saidas: 9800,
    amt: 2290,
  },
  {
    name: "Abr",
    entradas: 2780,
    saidas: 3908,
    amt: 2000,
  },
  {
    name: "Mai",
    entradas: 1890,
    saidas: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    entradas: 2390,
    saidas: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    entradas: 3490,
    saidas: 4300,
    amt: 2100,
  },
  {
    name: "Ago",
    entradas: 4000,
    saidas: 2400,
    amt: 2400,
  },
  {
    name: "Set",
    entradas: 3000,
    saidas: 1398,
    amt: 2210,
  },
  {
    name: "Out",
    entradas: 2000,
    saidas: 9800,
    amt: 2290,
  },
  {
    name: "Nov",
    entradas: 2780,
    saidas: 3908,
    amt: 2000,
  },
  {
    name: "Dez",
    entradas: 1890,
    saidas: 4800,
    amt: 2181,
  },
];

export const HouseHoldBudgetChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="transparent" strokeDasharray="0" />
        <XAxis dataKey="name" />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value}`}
        />
        <Tooltip contentStyle={{ color: "hsl(var(--secondary))" }} />
        <Legend color="hsl(var(--destructive))" />
        <Bar
          color="hsl(var(--primary))"
          dataKey="entradas"
          fill="hsl(var(--primary))"
        />
        <Bar label="dawdu" dataKey="saidas" fill="hsl(var(--destructive))" />
      </BarChart>
    </ResponsiveContainer>
  );
};
