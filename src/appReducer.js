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
        case 'MARKET_ADD_ITEM':
            return {
                ...state,
                market: [...state.market, action.payload]
            }
        case 'MARKET_EDIT_ITEM':
            return {
                ...state,
                market: state.market.map(item => item.uid === action.payload.uid ? action.payload : item)
            }
        case 'MARKET_DELETE_ITEM':
            return {
                ...state,
                market: state.market.filter(item => item.uid !== action.uid)
            }
        case 'MARKET_DELETE_ITEMS':
            return {
                ...state,
                market: state.market.filter(item => !action.uids.includes(item.uid))
            }
        case 'UNIT_END':

            let orders = action.payload.map(item => {
                let stowage = item.stowage - item.count;
                let theNew = { ...item, stowage }
                delete theNew.count;
                return theNew
            })

            return {
                ...state,
                market: orders
            }

        default: 
            return state;
    }
}