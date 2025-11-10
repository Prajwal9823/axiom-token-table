"use client";

import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

export function Modal({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-900 border border-gray-700 p-6 text-gray-100 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out">
          {title && (
            <Dialog.Title className="text-lg font-semibold mb-1">{title}</Dialog.Title>
          )}
          {description && (
            <Dialog.Description className="text-sm text-gray-400 mb-3">
              {description}
            </Dialog.Description>
          )}
          <div>{children}</div>
          <Dialog.Close asChild>
            <button className="mt-4 px-3 py-1 bg-gray-800 rounded hover:bg-gray-700">
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
