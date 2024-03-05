import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { WalletTable } from "./components/wallet-table";
import { Toggle } from "@/components/ui/toggle";
import { assetListType } from "@/constants";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { DefaultRoutes } from "@/routes/routes";
import { getAssets } from "@/services/asset";
import { IAsset } from "@/types/asset";

export const MyAssets: React.FC = () => {
  const [activeItems, setActiveItems] = useState<string>("");
  const [assets, setAssets] = useState<IAsset[]>([]);
  const navigation = useNavigate();

  const getAllAssets = async () => {
    const data = await getAssets();
    setAssets(data as any as IAsset[]);
  };

  useEffect(() => {
    getAllAssets();
  }, []);

  return (
    <div className="mt-8 flex-1 m-auto px-8">
      <div className="my-4 flex flex-row justify-between align-bottom">
        <div className="flex flex-col">
          <h1 className="mb-2">Ativos</h1>
          <p>Gerencie os ativos que você possui.</p>
        </div>
        <Input className="w-[200px]" type="text" placeholder="Pesquisar" />
      </div>
      <div className="flex flex-col space-y-4">
        <Button
          onClick={() => navigation(DefaultRoutes.NEW_ASSET)}
          className="w-[200px] self-end gap-2"
        >
          <PlusIcon /> Adicionar ativo
        </Button>
        <div className=" flex gap-4">
          {assetListType.map((item) => (
            <Toggle
              variant="outline"
              size="sm"
              pressed={activeItems.includes(item.label)}
              onPressedChange={() => setActiveItems(item.label)}
              key={item.label}
            >
              {item.label}
            </Toggle>
          ))}
        </div>
        <div className="flex flex-row gap-4">
          <WalletTable assets={assets} />
        </div>
      </div>
    </div>
  );
};
