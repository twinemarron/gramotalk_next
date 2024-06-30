"use client";

import { useFormStatus } from "react-dom";
import { Input, InputProps } from "@/components/ui/input";

export function FormInput({
  ...rest
}: InputProps & React.RefAttributes<HTMLInputElement>) {
  const { pending } = useFormStatus();

  return <Input disabled={pending} {...rest} />;
}
