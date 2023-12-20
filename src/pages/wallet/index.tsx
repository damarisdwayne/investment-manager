import React from "react";
import { WalletTabs } from "./wallet-tabs";

const Wallet: React.FC = () => {
  return (
    <div className="mt-8 flex-1 m-auto px-8">
      <WalletTabs />
    </div>
  );
};

export default Wallet;
