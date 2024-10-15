"use client";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import React from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "danger";
  className?: string;
  "data-testid"?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full">
      <EnvelopeOpenIcon className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
}
