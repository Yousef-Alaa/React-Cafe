import React, { useEffect } from 'react';
import { Layout, ConfigProvider } from 'antd';
import TheRoutes from './routes';
import SideBar from './componenets/SideBar';
import './App.scss';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive'

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

    const { isDark, bgLinear, colors } = useSelector(state => state.theme)
    const isSmallerThan544 = useMediaQuery({ query: '(max-width: 544px)' })

    useEffect(() => {
        document.documentElement.style.setProperty('--main', colors.main)
        document.documentElement.style.setProperty('--rgbmain', colors.rgbmain)
        document.documentElement.style.setProperty('--mainBg', colors.mainBg)
        document.documentElement.style.setProperty('--text', colors.text)
        document.documentElement.style.setProperty('--rgbtext', colors.rgbtext)
        document.querySelector('meta[name="theme-color"]').content = colors.main
    },[colors])

    function getLayoutBg() {
        if (isDark && bgLinear) return `linear-gradient(15deg, ${colors.main} 10%, black 100%)`
        if (!isDark && bgLinear) return `linear-gradient(20deg, ${colors.main} 10%, #E4E4E4 100%)`
        if (!isDark && !bgLinear) return 'var(--bgNotDarkNotLinear)'
        return colors.mainBg
    }


    return (
        <ConfigProvider theme={{ token: {colorPrimary: colors.main} }} >
            <Layout style={{height: '100vh', flexDirection: 'row', background: getLayoutBg()}}>
                <SideBar />
                <Layout style={{background: 'transparent', backdropFilter: `blur(${isDark ? '3px' : '10px'})`, borderLeft: `${isSmallerThan544 ? 0 : 2}px solid ${colors.textWithOpacity(isDark ? 100 : 35)}`, overflow: 'hidden scroll'}}>
                    <Layout.Content style={{padding: 10, color: colors.text}}>
                        <TheRoutes />
                    </Layout.Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default App;