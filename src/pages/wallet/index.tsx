import React, { useState } from "react";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletTable } from "./wallet-table";
import { OverViewChart } from "../home/components/overview-chart";
import { Toggle } from "@/components/ui/toggle";
import { assetList } from "@/constants";
import { IncludeActiveDialog } from "@/components/include-active-dialog";

const Wallet: React.FC = () => {
  const [activeItems, setActiveItems] = useState<string[]>([]);

  const handleToggle = (itemLabel: string) => {
    const itemIndex = activeItems.indexOf(itemLabel);

    if (itemIndex !== -1) {
      const newActiveItems = [...activeItems];
      newActiveItems.splice(itemIndex, 1);
      setActiveItems(newActiveItems);
    } else {
      setActiveItems([...activeItems, itemLabel]);
    }
  };

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
        <IncludeActiveDialog />
        <div className=" flex gap-4">
          {assetList.map((item) => (
            <Toggle
              variant="outline"
              size="sm"
              pressed={activeItems.includes(item.label)}
              onPressedChange={() => handleToggle(item.label)}
              key={item.label}
            >
              {item.label}
            </Toggle>
          ))}
        </div>
        <div className="flex flex-row gap-4">
          <Card className="flex-[2]">
            <CardHeader>
              <CardTitle>Lista de ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <WalletTable />
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Carteira</CardTitle>
            </CardHeader>
            <CardContent>
              <OverViewChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
