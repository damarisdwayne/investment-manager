import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { AssetGroup } from "@/constants";
import { IAsset } from "@/types/asset";
import { FixedIncomeAndTreasuryForm, GenericForm } from "./form";

interface EditAssetProps {
  asset: IAsset;
}

export const EditAssetDialog = ({ asset }: EditAssetProps) => {
  const { assetGroup, ticker, operation, exchangeName, rate } = asset;

  const renderCategory = () => {
    switch (assetGroup) {
      case AssetGroup.STOCK:
      case AssetGroup.STOCK_USA:
      case AssetGroup.BDR:
      case AssetGroup.SUBSCRIPTION_RIGHT:
      case AssetGroup.ETF:
      case AssetGroup.FI_AGRO:
      case AssetGroup.FII:
      case AssetGroup.REIT:
        return "stockExchange";
      case AssetGroup.TREASURY:
        return "treasury";
      case AssetGroup.CCB:
      case AssetGroup.CDB:
      case AssetGroup.CRA:
      case AssetGroup.CRI:
      case AssetGroup.DEBENTURE:
      case AssetGroup.DEBENTURE_INCENTIVADA:
      case AssetGroup.FIDC:
      case AssetGroup.LC:
      case AssetGroup.LCA:
      case AssetGroup.LCI:
      case AssetGroup.LF:
      case AssetGroup.LIG:
      case AssetGroup.RDB:
      case AssetGroup.RDC:
        return "fixedIncome";

      default:
        return "cryptocurrency";
    }
  };

  const category = renderCategory();

  const renderForm = () => {
    switch (category) {
      case "stockExchange":
        return (
          <GenericForm
            categotySelected={category}
            defaultValues={{
              ticker,
              operation,
              exchangeName,
              rate: +rate!,
              type: assetGroup!,
            }}
            isEditMode
          />
        );
      case "fixedIncome":
        return <FixedIncomeAndTreasuryForm categotySelected={category} />;
      case "treasury":
        return <FixedIncomeAndTreasuryForm categotySelected={category} />;

      default:
        return <GenericForm isEditMode categotySelected={category} />;
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 align-middle">
          <PlusIcon /> Aportar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60%] rounded">
        <DialogHeader>
          <DialogTitle>Aportar</DialogTitle>
        </DialogHeader>
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
};
