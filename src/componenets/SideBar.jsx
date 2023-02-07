import React, { useState, useContext } from 'react';
import {
    DoubleRightOutlined,
    DoubleLeftOutlined,
    HomeOutlined,
    TeamOutlined,
    LaptopOutlined,
    ShopOutlined,
    SettingOutlined,
    HighlightOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as PlayStation} from '../assets/PlayStation.svg';
import { ReactComponent as PlayStationSmall} from '../assets/PlayStation-Small.svg';
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
            label: "Home",
        },
        {
            key: '/market',
            icon: <ShopOutlined />,
            label: "Market",
        },
        {
            key: '/settings',
            icon: <SettingOutlined />,
            label: "Settings",
        },
        {
            key: '/reports',
            icon: <LaptopOutlined />,
            label: "Reports",
        },
        {
            key: '/users', // TODO remove it
            icon: <TeamOutlined />,
            label: "Users",
        },
        {
            key: '/olddesign',// TODO remove it
            icon: <HighlightOutlined />,
            label: "Old Design",
        },
        {
        key: '/images',// TODO remove it
        icon: <SettingOutlined />,
        label: "Images",
        },
    ];


    return (
    <Layout.Sider className={!isDark && 'sider-light'} trigger={null} style={{background: 'transparent', backdropFilter: `blur(${isDark ? 0 : 3}px)`, paddingTop: 10}} collapsible collapsed={collapsed}>
        <div className="logo">
            {collapsed ?
                <PlayStationSmall style={{maxWidth: '100%', fill: colors.text, height: 60, filter: `drop-shadow(2px 4px 5px ${colors.textWithOpacity(70)})`}} /> :
                <PlayStation style={{maxWidth: '100%', fill: colors.text, height: 60, filter: `drop-shadow(2px 4px 5px ${colors.textWithOpacity(70)})`}} />
            }
        </div>
        <Menu
        theme={isDark ? "dark" : 'light'}
        style={{background: 'transparent'}}
        mode="inline"
        onSelect={({key}) => navigate(key)}
        defaultSelectedKeys={[location.pathname]}
        items={NavItems}
        />

        <span className='trigger' style={{color: colors.text}} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <DoubleRightOutlined /> : (<><DoubleLeftOutlined /><span>&nbsp;&nbsp;Shrink</span></>)}
        </span>
    </Layout.Sider>
    );
}

export default SideBar;