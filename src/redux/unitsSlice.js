import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    pc: {
        devices: 0,
        hourPrice: 6,
    },
    ps4: {
        devices: 0,
        singlePrice: 10,
        multiPrice: 15,
    },
    ps5: {
        devices: 0,
        singlePrice: 15,
        multiPrice: 20,
    },
};

export const unitsSlice = createSlice({
    name: "units",
    initialState,
    reducers: {
        changePC: (state, action) => {
            state.pc.devices = action.payload.devices
            state.pc.hourPrice = action.payload.hourPrice
        },
        changePS4: (state, action) => {
            state.ps4.devices = action.payload.devices
            state.ps4.singlePrice = action.payload.singlePrice
            state.ps4.multiPrice = action.payload.multiPrice
        },
        changePS5: (state, action) => {
            state.ps5.devices = action.payload.devices
            state.ps5.singlePrice = action.payload.singlePrice
            state.ps5.multiPrice = action.payload.multiPrice
        },

    },
});

export const { changePC, changePS4, changePS5 } = unitsSlice.actions;

export default unitsSlice.reducer;
