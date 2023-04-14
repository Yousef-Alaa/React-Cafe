import React, { useState } from 'react';
import {
    DoubleRightOutlined,
    DoubleLeftOutlined,
    HomeOutlined,
    BarChartOutlined,
    ShopOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive'
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as PlayStation} from '../assets/PlayStation.svg';
import { ReactComponent as PlayStationSmall} from '../assets/PlayStation-Small.svg';
import { useEffect } from 'react';

function SideBar() {

    const navigate = useNavigate()
    const location = useLocation()
    const { colors, isDark } = useSelector(state => state.theme)

    const [collapsed, setCollapsed] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const isSmallerThan544 = useMediaQuery({ query: '(max-width: 544px)' })
    const NavItems = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: "Home"
        },
        {
            key: '/market',
            icon: <ShopOutlined />,
            label: "Market"
        },
        {
            key: '/reports',
            icon: <BarChartOutlined />,
            label: "Reports"
        },
        {
            key: '/settings',
            icon: <SettingOutlined />,
            label: "Settings"
        }
        // {
        //     key: '/getapp',
        //     icon: <DownloadOutlined />,
        //     label: "Get App"
        // }
    ];
    const asideStyle = {
        backdropFilter: `blur(${isDark ? 0 : 3}px)`,
        paddingTop: 10, 
        width: collapsed ? 80 : 185,
        minWidth: collapsed ? 80 : 185,
        left: collapsed ? '-100%' : 0
    }

    useEffect(() => {
        document.addEventListener("fullscreenchange", (event) => {
            if (window.innerHeight == screen.height) {
                setFullScreen(true);
            } else {
                setFullScreen(false);
            }
        });
    }, [])

    function handleFullScreen() {
        if (!fullScreen) {
            // Open Fullscreen
            if (document.body.requestFullscreen) {
                document.body.requestFullscreen();
            } else if (document.body.webkitRequestFullscreen) { /* Safari */
                document.body.webkitRequestFullscreen();
            } else if (document.body.msRequestFullscreen) { /* IE11 */
                document.body.msRequestFullscreen();
            }
        } else {
            // Close Fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }
    }

    return (
        <>
        <aside className={isSmallerThan544 ? 'sidebar-bottom' : ''} style={asideStyle}>
            <div className="logo">
                {collapsed ?
                    <PlayStationSmall style={{maxWidth: '100%', fill: colors.text, height: 60, marginBottom: 8, filter: `drop-shadow(2px 4px 5px ${colors.textWithOpacity(70)})`}} /> :
                    <PlayStation style={{maxWidth: '100%', fill: colors.text, height: 60, marginBottom: 8, filter: `drop-shadow(2px 4px 5px ${colors.textWithOpacity(70)})`}} />
                }
            </div>
            <ul style={{'--fontSize': collapsed ? 16 : 14}}>
                {NavItems.map((item, index) => <li 
                    key={index} 
                    style={{padding: collapsed ? '0 28px' : '0 16px 0 24px'}}
                    onClick={() => navigate(item.key)}
                    className={`nav-item ${item.key === location.pathname ? 'nav-item-active' : ''}`}
                    >

                    {item.icon}
                    <span className='text'>{item.label}</span>

                </li>)}
            </ul>

            <span className='trigger' style={{color: colors.text}}>
                <div className="icons" onClick={() => setCollapsed(!collapsed)} style={{paddingLeft: collapsed ? 21 : fullScreen ? 9.5 : 25.5}}>
                    {collapsed ? 
                        <DoubleRightOutlined /> :
                        <>
                            <DoubleLeftOutlined />
                            <span style={{display: isSmallerThan544 ? 'none' : 'block', whiteSpace: 'nowrap', overflow: 'hidden'}}>&nbsp;&nbsp;Shrink</span>
                        </>
                    }
                </div>
                <div className="icons" onClick={handleFullScreen} style={{paddingLeft: collapsed ? 21 : fullScreen ? 9.5 : 25.5}}>
                    {
                        !collapsed && fullScreen ? <><FullscreenExitOutlined /><span style={{display: isSmallerThan544 ? 'none' : 'block', whiteSpace: 'nowrap', overflow: 'hidden'}}>&nbsp;&nbsp;Exit Full Screen</span></> :
                        !collapsed && !fullScreen ? <><FullscreenOutlined /><span style={{display: isSmallerThan544 ? 'none' : 'block', whiteSpace: 'nowrap', overflow: 'hidden'}}>&nbsp;&nbsp;Full Screen</span></> : 
                        collapsed && fullScreen ? <FullscreenExitOutlined /> :
                        <FullscreenOutlined />
                    }
                </div>
            </span>
        </aside>
        {isSmallerThan544 && <DoubleRightOutlined style={{
            display: 'block',
            position: 'fixed',
            background: 'var(--mainBg)',
            color: '#FFF',
            fontSize: 18,
            padding: 10,
            opacity: '.6',
            zIndex: 2,
            border: '1px solid #FFF',
            translate: '0 -50%',
            left: 0,
            top: 'calc(50% + 90px)',
            borderRadius: '0 8px 8px 0',
            boxShadow: "0 0 5px #FFF",
            cursor: "pointer"
        }}
        onClick={() => setCollapsed(false)} />}
    </>
    );
}

export default SideBar;