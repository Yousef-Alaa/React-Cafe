import React, { useState, useContext } from 'react';
import {
    DoubleRightOutlined,
    DoubleLeftOutlined,
    HomeOutlined,
    BarChartOutlined,
    ShopOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { ReactComponent as PlayStation} from '../assets/PlayStation.svg';
import { ReactComponent as PlayStationSmall} from '../assets/PlayStation-Small.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

function SideBar() {

    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    const { appSettings: {theme: { colors, isDark } }} = useContext(AppContext)
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

    return (
    <aside data-aside style={{backdropFilter: `blur(${isDark ? 0 : 3}px)`, paddingTop: 10, width: collapsed ? 80 : 185, minWidth: collapsed ? 80 : 185}}>
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
                <span>{item.label}</span>

            </li>)}
        </ul>

        <span className='trigger' style={{color: colors.text}} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <DoubleRightOutlined /> : (<><DoubleLeftOutlined /><span>&nbsp;&nbsp;Shrink</span></>)}
        </span>
    </aside>
    );
}

export default SideBar;