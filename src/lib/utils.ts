import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges multiple CSS class values into a single optimized class string.
 *
 * Accepts any number of class values, conditionally joins them, and resolves Tailwind CSS class conflicts.
 *
 * @param inputs - Class values to be combined and merged
 * @returns The merged and optimized class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
