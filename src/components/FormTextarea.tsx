"use client";

import { useFormStatus } from "react-dom";
import { Textarea, TextareaProps } from "@/components/ui/textarea";

export function FormTextarea({
  ...rest
}: TextareaProps & React.RefAttributes<HTMLTextAreaElement>) {
  const { pending } = useFormStatus();

  return <Textarea disabled={pending} {...rest} />;
}
