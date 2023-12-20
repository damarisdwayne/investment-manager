import { Ball } from "@/components/ball";
import React, { Fragment } from "react";
import Chart, { ChartWrapperOptions } from "react-google-charts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface OverViewChartProps {
  label: string;
}

export const OverViewChart = ({ label }: OverViewChartProps) => {
  const assets = [
    { label: "Ações internacionais", bgColor: "#3E6336" },
    { label: "Ações nacionais", bgColor: "#8C955E" },
    { label: "Renda fixa", bgColor: "#A8D080" },
    { label: "Fundos imobiliários", bgColor: "#C1E1C5" },
    { label: "Reits", bgColor: "#81C1D7" },
    { label: "Criptomoedas", bgColor: "#BEE3DB" },
    { label: "Ouro", bgColor: "#efb810" },
  ];
  const data = [
    ["Linguagens", "Quantidade"],
    ["Ações internacionais", 100],
    ["Ações nacionais", 80],
    ["Renda fixa", 50],
    ["Fundos imobiliários", 50],
    ["Reits", 30],
    ["Criptomoedas", 10],
    ["Ouro", 5],
  ];

  const options: ChartWrapperOptions["options"] = {
    backgroundColor: "transparent",
    colors: [
      "#3E6336",
      "#8C955E",
      "#A8D080",
      "#C1E1C5",
      "#81C1D7",
      "#BEE3DB",
      "#efb810",
    ],
    legend: {
      position: "none",
    },
  };

  return (
    <Card className="flex-1 w-full h-full space-y-2 align-middle justify-center flex flex-col">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <Chart
          width={"100%"}
          chartType="PieChart"
          data={data}
          options={options}
          style={{ borderBlockColor: "none" }}
        />
        <div className="flex flex-col gap-1">
          {assets.map(({ label, bgColor }, index) => (
            <Fragment key={index}>
              <Ball {...{ label, bgColor }} />
            </Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
