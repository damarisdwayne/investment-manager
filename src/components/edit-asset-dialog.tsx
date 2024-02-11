import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputLabelGroup } from "./input-label-group";

export const AddQuestionDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Editar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded">
        <DialogHeader>
          <DialogTitle>Editar ativo</DialogTitle>
        </DialogHeader>
        <div className="flex">
          <InputLabelGroup label="Tipo de investimento">
            <Input id="institution" type="text" />
          </InputLabelGroup>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
