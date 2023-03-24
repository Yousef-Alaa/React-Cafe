import React, { useEffect } from 'react';
import { Layout, ConfigProvider } from 'antd';
import TheRoutes from './routes';
import SideBar from './componenets/SideBar';
import './App.scss';
import { useSelector } from 'react-redux';

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
/* 
    TODO:
    Save All Settings and market and reports to Local Storage || DataBase
    Solve the Edit btn problem in setting page
    make it responsive
*/
function App() {

    const { isDark, bgLinear, colors } = useSelector(state => state.theme)


    useEffect(() => {
        document.documentElement.style.setProperty('--main', colors.main)
        document.documentElement.style.setProperty('--rgbmain', colors.rgbmain)
        document.documentElement.style.setProperty('--mainBg', colors.mainBg)
        document.documentElement.style.setProperty('--text', colors.text)
        document.documentElement.style.setProperty('--rgbtext', colors.rgbtext)
    },[colors])

    function getLayoutBg() {
        if (isDark && bgLinear) return `linear-gradient(15deg, ${colors.main} 10%, black 100%)`
        if (!isDark && bgLinear) return `linear-gradient(20deg, ${colors.main} 10%, white 100%)`
        if (!isDark && !bgLinear) return 'var(--bgNotDarkNotLinear)'
        return colors.mainBg
    }


    return (
        <ConfigProvider theme={{ token: {colorPrimary: colors.main} }} >
            <Layout style={{height: '100vh', flexDirection: 'row', background: getLayoutBg()}}>
                <SideBar />
                <Layout style={{background: 'transparent', backdropFilter: `blur(${isDark ? '3px' : colors.bgBlur})`, borderLeft: `${window.innerWidth < 544 ? 0 : 2}px solid ${colors.textWithOpacity(isDark ? 100 : 35)}`, overflow: 'hidden scroll'}}>
                    <Layout.Content style={{padding: 10, color: colors.text}}>
                        <TheRoutes />
                    </Layout.Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default App;