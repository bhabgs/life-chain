import { create } from 'zustand'

interface IChatState {
  currentSessionId: string | null
  inputText: string
  setSession: (id: string | null) => void
  setInput: (text: string) => void
}

export const useChatStore = create<IChatState>((set) => ({
  currentSessionId: null,
  inputText: '',

  setSession: (id) => set({ currentSessionId: id }),
  setInput: (text) => set({ inputText: text }),
}))
