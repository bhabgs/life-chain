import { create } from 'zustand'
import type { IMemory } from '@lifechain/shared'

interface IMemoryState {
  recentMemories: IMemory[]
  setRecent: (memories: IMemory[]) => void
  clearCache: () => void
}

export const useMemoryStore = create<IMemoryState>((set) => ({
  recentMemories: [],

  setRecent: (memories) => set({ recentMemories: memories.slice(0, 5) }),

  clearCache: () => set({ recentMemories: [] }),
}))
