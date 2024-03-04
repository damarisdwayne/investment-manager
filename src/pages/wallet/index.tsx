import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React from "react";
import Diagram from "./diagram";
import { MyAssets } from "./my-assets";
import { MyGoals } from "./my-goals";
import { NewContribuition } from "./new-contribuition";

const Wallet: React.FC = () => {
  return (
    <div className="mt-8 w-full flex-1 m-auto px-8">
      <Tabs defaultValue="myAssets" className="flex-1">
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
    </div>
  );
};

export default Wallet;
