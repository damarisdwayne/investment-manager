import { PieChart } from "@mui/x-charts/PieChart";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface OverViewChartProps {
  label: string;
}

export const OverViewChart = ({ label }: OverViewChartProps) => {
  return (
    <Card className="flex-1 w-full h-full space-y-2 align-middle justify-center flex flex-col">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-start">
        <PieChart
          slotProps={{
            legend: {
              padding: 0,
              position: { vertical: "middle", horizontal: "right" },
              direction: "column",
              labelStyle: {
                fill: "hsl(var(--foreground))",
              },
            },
          }}
          series={[
            {
              data: [
                {
                  id: 0,
                  value: 10,
                  label: "Ações Nacionais",
                  color: "#1e40af",
                },
                {
                  id: 1,
                  value: 15,
                  label: "Ações Internacionais",
                  color: "#0369a1",
                },
                {
                  id: 2,
                  value: 20,
                  label: "Fundos imobiliários",
                  color: "#0891b2",
                },
                {
                  id: 3,
                  value: 20,
                  label: "Reits",
                  color: "#0d9488",
                },
                {
                  id: 4,
                  value: 20,
                  label: "Renda fixa",
                  color: "#10b981",
                },
                {
                  id: 5,
                  value: 20,
                  label: "Criptomoedas",
                  color: "#4ade80",
                },
                {
                  id: 6,
                  value: 20,
                  label: "Ouro",
                  color: "#facc15",
                },
              ],
            },
          ]}
          height={200}
          margin={{ right: 200 }}
        />
      </CardContent>
    </Card>
  );
};
