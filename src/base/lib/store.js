import { create } from 'zustand'

const useStore = create((set, get) => ({
  lenis: undefined,
  setLenis: (lenis) => set({ lenis }),
  overflow: true,
  setOverflow: (overflow) => set({ overflow }),
  forms: [],
  setForms: (forms) => set({ forms }),
}))

export {
  useStore
}