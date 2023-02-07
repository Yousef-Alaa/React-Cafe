export default function appReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_COLORS':
            return {
                ...state, 
                theme: {
                    ...state.theme,
                    colors: action.data
                }
            };
        case 'SET_THEME':
            return {
                ...state, 
                theme: {
                    ...state.theme,
                    isDark: action.data
                }
            };
        case 'SET_BGLINEAR':
            return {
                ...state, 
                theme: {
                    ...state.theme,
                    bgLinear: action.data
                }
            };
        case 'CHANGE_UNIT_MODE':
            return {
                ...state,
                hoursSystem: action.data
            }
        case 'CHANGE_UNIT_PC':
            return {
                ...state,
                pc: {
                    devices: action.data.devices,
                    hourPrice: action.data.hourPrice
                }
            }
        case 'CHANGE_UNIT_PS4':
            return {
                ...state,
                ps4: {
                    devices: action.data.devices,
                    singlePrice: action.data.singlePrice,
                    multiPrice: action.data.multiPrice
                }
            }
        case 'CHANGE_UNIT_PS5':
            return {
                ...state,
                ps5: {
                    devices: action.data.devices,
                    singlePrice: action.data.singlePrice,
                    multiPrice: action.data.multiPrice
                }
            }
        default: 
            return state;
    }
}