import React, { useContext } from 'react';
import { Col, Row, Card, Button, Typography, message, Tooltip, Dropdown, Space } from 'antd';
import Icon, {
    PauseOutlined,
    PoweroffOutlined,
    ShoppingCartOutlined,
    DownOutlined
} from '@ant-design/icons';
import { AppContext } from '../../App';
import { ReactComponent as PlayStation} from '../../assets/PS5.svg';
import { ReactComponent as ConsoleWithGamePad} from '../../assets/playstation-5.svg';
import { ReactComponent as PlaySolid} from '../../assets/play-solid.svg';

const { Text } = Typography;

export default function PS5({index}) {

    const { appSettings: {theme: { colors, isDark }} } = useContext(AppContext)
    const cardShadow = isDark ?
        `0 0 2px ${colors.text}, 0 0 5px ${colors.textWithOpacity(50)}` : 
        `0 0 2px ${colors.main}, 0 0 5px ${colors.mainWithOpacity(50)}`;

    const items = [
        {key: '1', label: '1st item', icon: <PoweroffOutlined />},
        {key: '2', label: '2nd item', icon: <PoweroffOutlined />},
        {key: '3', label: '3rd item', icon: <PoweroffOutlined />,
        children: [
            {
            key: '3-1',
            label: '3rd menu item',
            },
            {
            key: '3-2',
            label: '4th menu item',
            },
        ]
    },
    ];
    
    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };

    return (
        <Col className="gutter-row" xs={12} sm={8} xl={6}>
            <Card bordered={false} className={!isDark && 'light-unit'} style={{background: colors.mainBg, boxShadow: cardShadow}} bodyStyle={{padding: 12}}>
                <Row justify='space-between' align='middle' style={{borderBottom: `1px solid ${colors.text}`, paddingBottom: 2}}>
                    <PlayStation style={{maxWidth: 120, fill: colors.text, height: 30, position: 'relative', left: -10}} />
                    <Text style={{fontSize: 18, color: colors.text, fontWeight: 'bold'}}>{index + 1 < 10 ? `0${index+1}` : index + 1 }</Text>
                </Row>
                <Row justify='space-between' style={{color: colors.text, fontWeight: "bold", paddingBlock: 20}}>
                    <Col span={11} style={{height: 114, display: 'flex', alignItems: 'end'}}>
                        <ConsoleWithGamePad className='unit-img' style={{fill: colors.textWithOpacity(90), aspectRatio: '1 / 1', maxWidth: '100%'}} />
                    </Col>
                    <Col span={11} style={{display: 'flex', flexDirection: "column", justifyContent: 'flex-end'}}>
                        <Text style={{color: colors.text}}>Time: <span style={{color: '#ff6666'}}>01:15</span></Text>
                        <Text style={{color: colors.text}}>Mode: <span style={{color: '#ff69f8'}}>Single</span></Text>
                        <Text style={{color: colors.text}}>Price: <span style={{color: '#40e2a0'}}>15$</span></Text>
                    </Col>
                </Row>
                <Row align='middle' style={{borderTop: `1px solid ${colors.text}`, paddingTop: 10, justifyContent: "space-evenly"}}>
                    <Tooltip title={index % 2 === 0 ? 'Start' : "Pause"}>
                        <Button type="primary" shape="circle">
                        {index % 2 === 0 ? <Icon component={PlaySolid} /> : <PauseOutlined />}
                        </Button>
                    </Tooltip>
                    <Tooltip title="End">
                        <Button type="primary" shape="circle">
                            <PoweroffOutlined />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Buy Item">
                        <Button type="primary" ghost={true} shape="circle">
                            <ShoppingCartOutlined />
                        </Button>
                    </Tooltip>
                    <Dropdown menu={{ items, onClick: handleMenuClick }}>
                        <Space style={{
                        rowGap: '6px',
                        color: colors.text,
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginLeft: '15px'}}>
                            Actions
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                </Row>
            </Card>
        </Col>
    )
}