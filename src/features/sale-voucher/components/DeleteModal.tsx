import React from "react";
import { Trash2 } from "lucide-react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Voucher?"
      message="Are you sure you want to delete this voucher? This action cannot be undone!"
      confirmText="Delete"
      Icon={Trash2}
      variant="danger"
    />
  );
};
