import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for merging Tailwind CSS class names.
 *
 * - Combines multiple class values (strings, objects, arrays).
 * - Resolves conflicts and merges duplicates using `tailwind-merge`.
 */

export function MergeClasses(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
