import { createSlice } from "@reduxjs/toolkit";

let getColorsMap = (themeIsDark, bgIsLinear) => {
    return {
        main: '#2980B9',
        rgbmain: '41, 128, 185',
        mainBg: themeIsDark ? '#001529' : "#FFFFF7",
        text: themeIsDark || bgIsLinear ? '#FFF' : '#000',
        rgbtext: themeIsDark || bgIsLinear ? '255, 255, 255' : '0, 0, 0',
        black: '#000',
        white: '#FFF',
        bgBlur: '10px',
        textWithOpacity: function(opacity) {
            return themeIsDark || bgIsLinear ? `rgb(255 255 255 / ${opacity}%)` : `rgb(0 0 0 / ${opacity}%)`;
        },
        mainWithOpacity: function(opacity) {
            return `rgb(41 128 185 / ${opacity}%)`;
        }
    }
}

let isDark = true, bgLinear = false;

let initialState =  {
    isDark,
    bgLinear,
    colors: getColorsMap(isDark, bgLinear)
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action) => {
            state.isDark = action.payload
            state.colors = getColorsMap(action.payload, state.bgLinear)
        },
        changeBgLinear: (state, action) => {
            state.bgLinear = action.payload
            state.colors = getColorsMap(state.isDark, action.payload)
        },
        changeColors: (state, action) => {
            state.colors = action.payload
        }
    }
})

export const { changeTheme, changeBgLinear, changeColors } = themeSlice.actions

export default themeSlice.reducer