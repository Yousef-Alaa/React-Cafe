import { createSlice } from '@reduxjs/toolkit'

let initialState = [
  // {type: 'pc', date: '10-10-2023', time: '12:05', value: 20, itemName: '#00'},
  // {type: 'ps4', date: '10-10-2023', time: '12:05', value: 20, itemName: '#00'},
  // {type: 'ps5', date: '10-10-2023', time: '12:05', value: 20, itemName: '#00'},
  // {type: 'market', date: '10-10-2023', time: '12:05', value: 20, itemName: 'Cola'}
]

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    addReport: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.push(...action.payload)
      } else {
        state.push(action.payload)
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { addReport } = reportsSlice.actions

export default reportsSlice.reducer