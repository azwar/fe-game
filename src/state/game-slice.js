import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    questions: [],
  },
  reducers: {
    setQuestion: (state, action) => {
      state.questions = action.payload
    },
    getQuestion: (state) => {
      return state.questions
    },
  },
})

export const { setQuestion, getQuestion } = gameSlice.actions

export default gameSlice.reducer