import { createSlice } from '@reduxjs/toolkit'

let initialState = [
  {type: 'pc', date: '10-10-2023', time: '12:05', value: 20},
  {type: 'ps4', date: '10-10-2023', time: '12:05', value: 20},
  {type: 'ps5', date: '10-10-2023', time: '12:05', value: 20},
  {type: 'market', date: '10-10-2023', time: '12:05', value: 20, itemName: 'Cola'}
]

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    increment: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.push({value: action.payload})
    },
    decrement: state => {
      state.value -= 1
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = reportsSlice.actions

export default reportsSlice.reducer