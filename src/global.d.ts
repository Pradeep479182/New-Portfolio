/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@react-three/fiber'
declare module '@react-three/drei'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

export {}
