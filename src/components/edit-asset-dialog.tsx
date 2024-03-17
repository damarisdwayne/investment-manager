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
import { FixedIncomeAndTreasuryForm, GenericForm } from "./forms";

interface EditAssetProps {
  asset: {
    assetGroup: string;
    ticker: string;
    exchangeName: string;
    rate: number;
  };
}

export const EditAssetDialog = ({ asset }: EditAssetProps) => {
  const { assetGroup, ticker, exchangeName, rate } = asset;

  const renderCategory = () => {
    switch (assetGroup) {
      case AssetGroup.STOCK:
      case AssetGroup.BDR:
      case AssetGroup.FII:
      case AssetGroup.FI_AGRO:
      case AssetGroup.ETF:
      case AssetGroup.STOCK_USA:
      case AssetGroup.ETF_USA:
      case AssetGroup.SUBSCRIPTION_RIGHT:
      case AssetGroup.REIT:
        return "stockExchange";
      case AssetGroup.TREASURY:
        return "treasury";
      case AssetGroup.FIXED_INCOME:
        return "fixedIncome";

      default:
        return "cryptocurrency";
    }
  };

  const category = renderCategory();

  const renderGenericForm = () => (
    <GenericForm
      categotySelected={category}
      defaultValues={{
        ticker,
        exchangeName,
        rate: +rate!,
        type: assetGroup!,
      }}
      isEditMode
    />
  );
  const renderForm = () => {
    switch (category) {
      case "stockExchange":
        return renderGenericForm();
      case "fixedIncome":
      case "treasury":
        return <FixedIncomeAndTreasuryForm categotySelected={category} />;
      // case "cryptocurrency":
      //   return <CriptocurrencyForm categotySelected={category} />;

      default:
        return renderGenericForm();
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 align-middle">
          <PlusIcon />
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
