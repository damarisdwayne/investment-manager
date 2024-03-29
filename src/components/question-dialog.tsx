import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { questionSchema } from "@/schemas";
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
import { InputLabelGroup } from "./forms/input-label-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { QuestionData, addQuestion, editQuestion } from "@/services/questions";
import { useState } from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { DialogClose } from "@radix-ui/react-dialog";

interface QuestionDialogProps {
  isEditMode?: boolean;
  defaultValues?: {
    id: string;
    criterion: string;
    question: string;
    diagramType: string;
  };
}

export const QuestionDialog = ({
  isEditMode,
  defaultValues,
}: QuestionDialogProps) => {
  const [isOpen, setOpen] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(questionSchema),
    defaultValues: {
      criterion: defaultValues?.criterion || "",
      question: defaultValues?.question || "",
      diagramType: defaultValues?.diagramType || "",
    },
  });

  const { criterion, question, diagramType } = watch();

  const generateQuestionId = () => {
    return criterion?.toLowerCase().replace(/\s+/g, "_");
  };

  const questionId = generateQuestionId() || "";

  const onSubmit = async () => {
    const dataToSend: QuestionData = {
      questionId,
      criterion,
      question,
      diagramType,
    };

    if (isEditMode) {
      const id = defaultValues?.id || "";
      await editQuestion(id, dataToSend);
    } else {
      await addQuestion(dataToSend);
    }

    reset();
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          {isEditMode ? <Pencil1Icon /> : "Adicionar pergunta"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar pergunta" : "Adicionar pergunta"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputLabelGroup
            label="Critério"
            errorMessage={errors.criterion?.message}
          >
            <Input {...register("criterion")} id="critery" />
          </InputLabelGroup>
          <InputLabelGroup
            label="Pergunta"
            errorMessage={errors.question?.message}
          >
            <Input {...register("question")} id="question" />
          </InputLabelGroup>
          <Controller
            name="diagramType"
            control={control}
            render={({ field }) => (
              <InputLabelGroup
                label="Tipo de diagrama"
                errorMessage={errors.diagramType?.message}
              >
                <Select
                  {...field}
                  onValueChange={(value) => field.onChange(value)}
                  disabled={isEditMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent id="type">
                    <SelectGroup>
                      <SelectItem value="fii">
                        Investimentos imobiliários
                      </SelectItem>
                      <SelectItem
                        value="cerradoDiagram"
                        {...register("diagramType")}
                      >
                        Diagrama do cerrado
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </InputLabelGroup>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
