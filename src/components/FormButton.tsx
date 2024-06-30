"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/components/ui/button";

export function FormButton({
  label,
  ...rest
}: {
  label: string;
} & ButtonProps &
  React.RefAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} {...rest}>
      {label}
    </Button>
  );
}
