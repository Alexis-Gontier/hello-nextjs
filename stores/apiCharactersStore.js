import { create } from "zustand";

const useCharactersApiStore = create((set) => ({
  apiCharacters: [],
  setApiCharacters: (characters) => set({ apiCharacters: characters }),
  deleteApiCharacter: (id) =>
    set((state) => ({
      apiCharacters: state.apiCharacters.filter(
        (character) => character.id !== id
      ),
    })),
}));

export default useCharactersApiStore;