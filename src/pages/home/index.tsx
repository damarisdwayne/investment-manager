import React, { useEffect, useState } from "react";
import { OverViewChart } from "../../components/overview-chart";
import { HouseHoldBudgetChart } from "./components/household-budget-chart";
import { OverviewTable } from "./components/overview-table";
import { getAssets } from "@/services/asset";
import { IAsset } from "@/types/asset";
import { useNavigate } from "react-router-dom";
import { DefaultRoutes } from "@/routes/routes";

const Home: React.FC = () => {
  const [assets, setAssets] = useState<IAsset[]>([]);
  const navigate = useNavigate();

  const getAllAssets = async () => {
    const data = await getAssets();
    setAssets(data as any as IAsset[]);
  };

  useEffect(() => {
    getAllAssets();
  }, []);
  return (
    <div className=" w-full flex flex-1 flex-col pb-8 px-8">
      <h1 className="self-center mt-8 text-xl">
        Resumo dos Investimentos e Despesas
      </h1>
      <div className="w-full flex flex-col flex-1 max-h-full m-auto mt-8 md:max-h-[400px] md:flex-row gap-4">
        <div
          className="flex-1 cursor-pointer rounded p-2"
          onClick={() => navigate(DefaultRoutes.WALLET)}
        >
          <OverViewChart label="Carteira" assets={assets} />
        </div>
        <div className="flex-1 cursor-pointer rounded py-2">
          <HouseHoldBudgetChart />
        </div>
      </div>
      <div className="w-full flex flex-row gap-4 flex-1 m-auto mt-4 max-h-[400px]">
        <div className="flex-1 rounded p-2">
          <OverviewTable assets={assets} />
        </div>
      </div>
    </div>
  );
};

export default Home;
