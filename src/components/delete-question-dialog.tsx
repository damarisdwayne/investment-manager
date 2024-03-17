import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteQuestion } from "@/services/questions";
import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface DeleteQuestionDialogProps {
  questionId: string;
}

export const DeleteQuestionDialog = ({
  questionId,
}: DeleteQuestionDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    await deleteQuestion(questionId!);
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} variant="destructive">
          <TrashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Tem certeza de que deseja excluir esta pergunta? Esta ação não pode
          ser desfeita.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => setIsOpen(false)}
              type="button"
              variant="secondary"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button onClick={handleDelete} variant="destructive">
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
