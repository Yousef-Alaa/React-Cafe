import { createSlice } from "@reduxjs/toolkit";

let getColorsMap = () => {
    return {
        white: '#FFF',
        black: '#000',
        main: '#2980B9',
        rgbmain: '41, 128, 185',
        text: '#FFF',
        rgbtext: '255, 255, 255',
        mainBg: "#001529",

        textWithOpacity: function(opacity) {
            let realOpacity = opacity / 100;
            return `rgba(255, 255, 255, ${realOpacity})`;
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
        },
        changeBgLinear: (state, action) => {
            state.bgLinear = action.payload
        },
        changeColors: (state, action) => {
            state.colors = action.payload
        }
    }
})

export const { changeTheme, changeBgLinear, changeColors } = themeSlice.actions

export default themeSlice.reducer