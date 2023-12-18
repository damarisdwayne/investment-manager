import React from "react";
import { OverViewChart } from "./components/overview-chart";
import { HouseHoldBudgetChart } from "./components/household-budget-chart";
import { OverviewTable } from "./components/overview-table";

const Home: React.FC = () => {
  return (
    <div className=" w-full flex flex-1 flex-col pb-8 px-8">
      <h1 className="self-center mt-8 text-xl">
        Resumo dos Investimentos e Despesas
      </h1>
      <div className="w-full flex flex-row gap-4 flex-1 m-auto mt-8">
        <div className="flex-1 border-neutral-800 rounded border-2 p-2">
          <p>Carteira</p>
          <OverViewChart />
        </div>
        <div className="flex-[2] border-neutral-800 rounded border-2 py-2">
          <HouseHoldBudgetChart />
        </div>
      </div>
      <div className="w-full flex flex-row gap-4 flex-1 m-auto mt-4">
        <div className="flex-1 border-neutral-800 rounded border-2 p-2">
          <OverviewTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
