import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Class name utility with Tailwind merge
 * Only use this when you need to merge conflicting Tailwind classes
 * Adds ~8KB to the bundle
 */
export function cnMerged(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
