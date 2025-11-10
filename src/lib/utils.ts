import { type ClassValue, clsx } from 'clsx'

/**
 * Lightweight class name utility using only clsx
 * Use this for most components - no Tailwind merge overhead
 *
 * If you need to merge conflicting Tailwind classes (rare),
 * import cnMerged from '@/lib/utils-merged' instead
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
