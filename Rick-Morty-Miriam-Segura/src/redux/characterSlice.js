import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  apiCharacters: [],
  characters: [],
  currentCharacter: {},
  cont: 1,
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    addAllCharacters: (state, action) => {
      state.characters = action.payload;
    },
    addShownCharacters: (state, action) => {
      state.characters = action.payload;
    },
    getCurrentCharacter: (state, action) => {
      state.currentCharacter = action.payload;
    },
    getNext: (state, action) => {
      state.next = action.payload.info.next;
    },
    addCont: (state, action) => {
      state.cont = state.cont + 1;
    },
  },
});

export const {
  addAllCharacters,
  addCont,
  getCurrentCharacter,
  addShownCharacters,
  getNext,
} = characterSlice.actions;

export default characterSlice.reducer;
