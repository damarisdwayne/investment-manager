import React from "react";
import { Header } from "@/components/header";
import { OverViewChart } from "./components/overview-chart";
import { HouseHoldBudgetChart } from "./components/household-budget-chart";

const Home: React.FC = () => {
  return (
    <div className=" w-full flex flex-col">
      <Header />
      <h1 className="self-center mt-8 text-xl">
        Resumo dos Investimentos e Despesas
      </h1>
      <div className="w-full flex flex-row gap-4 max-w-[80%] m-auto mt-8">
        <div className="flex-1 border-neutral-800 rounded border-2 p-2">
          <OverViewChart />
        </div>
        <div className="flex-[2] border-neutral-800 rounded border-2 py-2">
          <HouseHoldBudgetChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
