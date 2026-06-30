declare module 'framer-motion' {
  import type * as React from 'react'

  type MotionComponentProps<Tag extends keyof JSX.IntrinsicElements> = React.ComponentPropsWithoutRef<Tag> & {
    [key: string]: unknown
  }

  export const motion: {
    [Tag in keyof JSX.IntrinsicElements]: React.ComponentType<MotionComponentProps<Tag>>
  }

  export const AnimatePresence: React.FC<React.PropsWithChildren>
  export function useMotionValue<T = number>(value: T): {
    get: () => T
    set: (next: T) => void
    [key: string]: unknown
  }
  export function useSpring<T = number>(value: any, options?: any): any
}
