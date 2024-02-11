import { Card, CardContent } from "@/components/ui/card";
import { BarChart } from "@mui/x-charts/BarChart";

export const HouseHoldBudgetChart = () => {
  const dataset = [
    {
      income: 59,
      outflow: 57,

      month: "Jan",
    },
    {
      income: 50,
      outflow: 52,
      month: "Fev",
    },
    {
      income: 47,
      outflow: 53,
      month: "Mar",
    },
    {
      income: 54,
      outflow: 56,
      month: "Apr",
    },
    {
      income: 57,
      outflow: 69,
      month: "May",
    },
    {
      income: 60,
      outflow: 63,
      month: "June",
    },
    {
      income: 59,
      outflow: 60,
      month: "July",
    },
    {
      income: 65,
      outflow: 60,
      month: "Aug",
    },
    {
      income: 51,
      outflow: 51,
      month: "Sept",
    },
    {
      income: 60,
      outflow: 65,
      month: "Oct",
    },
    {
      income: 67,
      outflow: 64,
      month: "Nov",
    },
    {
      income: 61,
      outflow: 70,
      month: "Dec",
    },
  ];

  const valueFormatter = (value: number) => `R$${value}`;
  return (
    <Card className="w-full h-full">
      <CardContent className="p-4 w-full h-full">
        <BarChart
          slotProps={{
            legend: {
              labelStyle: {
                fill: "hsl(var(--foreground))",
              },
            },
          }}
          dataset={dataset}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "month",
              tickLabelStyle: { fill: "white" },
            },
          ]}
          yAxis={[
            {
              scaleType: "linear",
              dataKey: "income",
              tickLabelStyle: { fill: "white" },
              valueFormatter,
            },
          ]}
          series={[
            {
              dataKey: "income",
              stack: "A",
              label: "Entrada",
              valueFormatter,
              color: "hsl(var(--primary))",
            },
            {
              dataKey: "outflow",
              label: "Saída",
              valueFormatter,
              color: "hsl(var(--destructive))",
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};
