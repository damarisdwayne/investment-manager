import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MyAssets } from "./my-assets";
import { NewContribuition } from "./new-contribuition";
import Diagram from "./diagram";
import { MyGoals } from "./my-goals";

export const WalletTabs: React.FC = () => {
  return (
    <Tabs defaultValue="myAssets" className="w-full">
      <TabsList className="flex">
        <TabsTrigger value="myAssets" className="flex-1">
          Meus ativos
        </TabsTrigger>
        <TabsTrigger value="myGoals" className="flex-1">
          Minhas metas
        </TabsTrigger>
        <TabsTrigger value="newContribution" className="flex-1">
          Novo aporte
        </TabsTrigger>
        <TabsTrigger value="diagrams" className="flex-1">
          Diagramas
        </TabsTrigger>
      </TabsList>
      <TabsContent value="myAssets">
        <MyAssets />
      </TabsContent>
      <TabsContent value="myGoals">
        <MyGoals />
      </TabsContent>
      <TabsContent value="newContribution">
        <NewContribuition />
      </TabsContent>
      <TabsContent value="diagrams">
        <Diagram />
      </TabsContent>
    </Tabs>
  );
};
