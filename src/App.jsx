import React, { useEffect, useReducer, createContext } from 'react';
import { Layout, ConfigProvider } from 'antd';
import TheRoutes from './routes';
import SideBar from './componenets/SideBar';
import appReducer from './appReducer';
import './App.scss';
import { useCallback } from 'react';

export const AppContext = createContext(null)

function App() {

    let isDark = false; // TODO get from local storage
    let bgLinear = false; // TODO get from local storage
    let getColorsMap = useCallback((themeIsDark, bgIsLinear) => {
        return {
            main: '#2980B9',
            rgbmain: '41, 128, 185',
            mainBg: themeIsDark ? '#001529' : "#FFFFF7",
            text: themeIsDark || bgIsLinear ? '#FFF' : '#000', //Todo not work
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
    }, [])

    let defaultData = {
        theme: {
            isDark,
            bgLinear,
            colors: getColorsMap(isDark, bgLinear),
        },
        hoursSystem: 24,
        pc: {
            devices: 16,
            hourPrice: 17,
        },
        ps4: {
            devices: 8,
            singlePrice: 20,
            multiPrice: 25
        },
        ps5: {
            devices: 4,
            singlePrice: 30,
            multiPrice: 35
        }
        // TODO add market items
    }

    let [appSettings, dispatchSetting] = useReducer(appReducer, defaultData)
    let { theme: { colors } } = appSettings


    useEffect(() => {
        document.documentElement.style.setProperty('--main', colors.main)
        document.documentElement.style.setProperty('--rgbmain', colors.rgbmain)
        document.documentElement.style.setProperty('--mainBg', colors.mainBg)
        document.documentElement.style.setProperty('--text', colors.text)
    },[colors])

    useEffect(() => {
        
        let colorsObj = getColorsMap(appSettings.theme.isDark, appSettings.theme.isDark.bgLinear);
        dispatchSetting({type: 'CHANGE_COLORS', data: colorsObj})

    }, [appSettings.theme.isDark, appSettings.theme.isDark.bgLinear, getColorsMap])

    function getLayoutBg() {
        if (appSettings.theme.isDark && appSettings.theme.bgLinear) return `linear-gradient(15deg, ${colors.main} 10%, black 100%)`
        if (!appSettings.theme.isDark && appSettings.theme.bgLinear) return `linear-gradient(15deg, ${colors.main} 10%, white 100%)`
        return colors.mainBg
    }


    return (
        <AppContext.Provider value={{ appSettings, dispatchSetting }}>
            <ConfigProvider theme={{ token: {colorPrimary: colors.main} }} >
                <Layout style={{height: '100vh', background: getLayoutBg()}}>
                    <SideBar />
                    <Layout style={{background: 'transparent', backdropFilter: `blur(${appSettings.theme.isDark === 'light' ? colors.bgBlur : '3px'})`, borderLeft: `2px solid ${colors.textWithOpacity(appSettings.theme.isDark ? 100 : 35)}`, overflow: 'hidden scroll'}}>
                        <Layout.Content style={{padding: 10, color: colors.text}}>
                            <TheRoutes />
                        </Layout.Content>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </AppContext.Provider>
    );
};
export default App;