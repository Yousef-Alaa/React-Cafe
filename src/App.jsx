import React, { useEffect, useReducer, createContext } from 'react';
import { Layout, ConfigProvider } from 'antd';
import TheRoutes from './routes';
import SideBar from './componenets/SideBar';
import appReducer from './appReducer';
import './App.scss';
import { useCallback  } from 'react';

// import { initThinBackend, query } from 'thin-backend';
// import { ThinBackend, useQuery } from 'thin-backend-react';

// initThinBackend({
//     host: 'https://playstation-system.thinbackend.app'
// });


export const AppContext = createContext(null)

export function getUID() {

    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let nums = `${Math.floor(Math.random() * Date.now())}`
    let randIndexes = [
        Math.floor(Math.random() * chars.length),
        Math.floor(Math.random() * chars.length),
        Math.floor(Math.random() * chars.length)
    ]

    let uid = '';
    randIndexes.forEach(i => uid+= chars[i])
    uid += nums.substring(0, 3);

    return uid

}

function App() {

    let isDark = !false; // TODO get from local storage n
    let bgLinear = false; // TODO get from local storage
    let getColorsMap = useCallback((themeIsDark, bgIsLinear) => {
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
        },
        market: [
            {uid: getUID(), price: Math.ceil( Math.random() * 10 ), stowage: Math.ceil( Math.random() * 15 ), name: `Coffee`, icon: {local: true, src: 'coffee.png'} },
            {uid: getUID(), price: Math.ceil( Math.random() * 10 ), stowage: Math.ceil( Math.random() * 15 ), name: `Nescafe`, icon: {local: true, src: 'nescafe.png'} },
            {uid: getUID(), price: Math.ceil( Math.random() * 10 ), stowage: Math.ceil( Math.random() * 15 ), name: `Indomi`, icon: {local: true, src: 'indomi.png'} },
            {uid: getUID(), price: Math.ceil( Math.random() * 10 ), stowage: Math.ceil( Math.random() * 15 ), name: `Mango`, icon: {local: true, src: 'mango-juice.png'} },
            {uid: getUID(), price: Math.ceil( Math.random() * 10 ), stowage: Math.ceil( Math.random() * 15 ), name: `7UP`, icon: {local: true, src: '7up.png'} },
            {uid: getUID(), price: Math.ceil( Math.random() * 10 ), stowage: Math.ceil( Math.random() * 15 ), name: `Pepsi`, icon: {local: true, src: 'pepsi.png'} },
            {uid: getUID(), price: Math.ceil( Math.random() * 10 ), stowage: Math.ceil( Math.random() * 15 ), name: `Tea`, icon: {local: true, src: 'tea.png'} },
            {uid: getUID(), price: Math.ceil( Math.random() * 10 ), stowage: Math.ceil( Math.random() * 15 ), name: `Water`, icon: {local: true, src: 'water.png'} },
            {uid: getUID(), price: Math.ceil( Math.random() * 10 ), stowage: Math.ceil( Math.random() * 15 ), name: `Mirnda Apple`, icon: {local: true, src: 'apple.png'} },
            {uid: getUID(), price: Math.ceil( Math.random() * 10 ), stowage: Math.ceil( Math.random() * 15 ), name: `Mirnda Orange`, icon: {local: true, src: 'mirnda-orange.png'} },
            {uid: getUID(), price: Math.ceil( Math.random() * 10 ), stowage: Math.ceil( Math.random() * 15 ), name: `Orange`, icon: {local: true, src: 'orange-juice.png'} }
        ]
    }

    let [appSettings, dispatchSetting] = useReducer(appReducer, defaultData)
    let { theme: { colors } } = appSettings

    // useEffect(() => {
    //     async function ff() {
    //         const todos = await query('users').fetch()
    //         console.log(todos);
    //     }

    //     ff()
    // }, [])


    useEffect(() => {
        document.documentElement.style.setProperty('--main', colors.main)
        document.documentElement.style.setProperty('--rgbmain', colors.rgbmain)
        document.documentElement.style.setProperty('--mainBg', colors.mainBg)
        document.documentElement.style.setProperty('--text', colors.text)
        document.documentElement.style.setProperty('--rgbtext', colors.rgbtext)
    },[colors])

    useEffect(() => {
        
        let colorsObj = getColorsMap(appSettings.theme.isDark, appSettings.theme.bgLinear);
        dispatchSetting({type: 'CHANGE_COLORS', data: colorsObj})

    }, [appSettings.theme.isDark, appSettings.theme.bgLinear])

    function getLayoutBg() {
        if (appSettings.theme.isDark && appSettings.theme.bgLinear) return `linear-gradient(15deg, ${colors.main} 10%, black 100%)`
        if (!appSettings.theme.isDark && appSettings.theme.bgLinear) return `linear-gradient(20deg, ${colors.main} 10%, white 100%)`
        return colors.mainBg
    }


    return (
        // <ThinBackend>
            <AppContext.Provider value={{ appSettings, dispatchSetting }}>
                <ConfigProvider theme={{ token: {colorPrimary: colors.main} }} >
                    <Layout style={{height: '100vh', flexDirection: 'row', background: getLayoutBg()}}>
                        <SideBar />
                        <Layout style={{background: 'transparent', backdropFilter: `blur(${appSettings.theme.isDark === 'light' ? colors.bgBlur : '3px'})`, borderLeft: `2px solid ${colors.textWithOpacity(appSettings.theme.isDark ? 100 : 35)}`, overflow: 'hidden scroll'}}>
                            <Layout.Content style={{padding: 10, color: colors.text}}>
                                <TheRoutes />
                            </Layout.Content>
                        </Layout>
                    </Layout>
                </ConfigProvider>
            </AppContext.Provider>
        // </ThinBackend>
    );
};
export default App;