"use client";

import { MergeClasses } from "@/utils/mergeClasses";
import { ElementType, HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "subtitle" | "text" | "caption";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "center" | "left" | "right";
  color?: string;
  italic?: boolean;
  underline?: boolean;
  as?: ElementType;
}

export function Text({
  as: Component = "p",
  variant = "text",
  weight = "normal",
  color = "text-foreground",
  align = "left",
  italic = false,
  underline = false,
  className,
  ...props
}: TextProps) {
  return (
    <Component
      className={MergeClasses(
        // Variants
        variant === "h1" && "text-2xl md:text-3xl",
        variant === "h2" && "text-xl md:text-2xl",
        variant === "h3" && "text-lg md:text-xl",
        variant === "subtitle" && "text-base",
        variant === "text" && "text-sm",
        variant === "caption" && "text-xs",

        // Weight
        weight === "normal" && "font-normal",
        weight === "medium" && "font-medium",
        weight === "semibold" && "font-semibold",
        weight === "bold" && "font-bold",

        // Align
        align === "center" && "text-center",
        align === "right" && "text-right",
        align === "left" && "text-left",

        // Modifiers
        italic && "italic",
        underline && "underline",

        color,

        className,
      )}
      {...props}
    />
  );
}
