import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-3xl text-lg border-b-4 border-black",
  {
    variants: {
      variant: {
        default: "",
        add: "bg-(--slate-200) hover:bg-(--violet-600) hover:text-white",
        save: "bg-(--slate-200) hover:bg-(--lime-300)",
        delete: "bg-(--rose-500) text-white",
      },
      size: {
        default: "min-w-[168px] min-h-[56px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
