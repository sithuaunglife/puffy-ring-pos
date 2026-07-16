"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Trash, Trash2 } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { useState } from "react";
import { CategoryDetailType } from "@/types/CategoryTypes";

type Props = {
  onDelete: (id: number) => void;
  isLoading?: boolean;
  description: string; // Description type checking
  title: string;
  iconClassName?: string;
  triggerClassName?: string;
} & VariantProps<typeof buttonVariants>;

export function AlertDelete({
  onDelete,
  isLoading,
  description,
  title,
  variant,
  size,
  triggerClassName,
  iconClassName,
}: Props) {
  const [open, setOpen] = useState(false); // Control AlertDialog open/close state

  const handleConfirm = async () => {
    await onDelete();
    setOpen(false);
  }; // Close dialog after successful delete
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        disabled={isLoading}
        className={cn(
          triggerClassName,
          // Allow additional custom classes to be passed to the trigger button
        )}
      >
        {isLoading ? <Spinner className=" size-2" /> : <Trash2 />}
      </AlertDialogTrigger>
      <AlertDialogContent className={`bg-white border border-slate-200`}>
        <AlertDialogHeader>
          <AlertDialogTitle className={"font-bold text-xl"}>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className={"text-zinc-500 text-sm mt-2"}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="bg-transparent border-0">
          <AlertDialogCancel
            className={"w-[76px] h-[36px] border border-slate-300"}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={
              "bg-red-600 hover:bg-red-700 w-[98px] h-[36px] flex items-center justify-center gap-2"
            }
            onClick={handleConfirm} // Run delete action and close dialog on success
          >
            <Trash />
            {isLoading ? <Spinner className=" size-2" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
