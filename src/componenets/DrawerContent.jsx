import React, { useContext } from 'react';
import { Col, Row, Button, Select, Layout, Modal } from 'antd';
import { DollarCircleOutlined, FieldTimeOutlined, HourglassOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { FaRegLightbulb } from 'react-icons/fa';
import { MdMode } from 'react-icons/md';
import { AppContext } from '../App';
import { useState } from 'react';


function DrawerContent({ unitState, dispatch, unitType }) {
    
    let iconSize = 2
    const { appSettings, dispatchSetting } = useContext(AppContext)
    let {theme: { colors }} = appSettings
    const [isOpen, setIsOpen] = useState(false)
    let rowsStyle = {
        marginBottom: 7
    }
    let colsStyle = {
        fontSize: 16,
        fontWeight: 'bold'
    }

    function getOrdersTotal() {
        let { orders } = unitState;
        let total = orders.map(item => item.price * item.count)
        let final = 0;
        total.forEach(item => final+=item)
        return final;
    }

    function getDuration() {
        let totalSeconds = unitState.duration;
        let hours = Math.floor( totalSeconds / (60 * 60) )
        let minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
        let seconds = ((totalSeconds % (60 * 60)) % 60)
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    function getTimeCost() {
        let timeByHour = (unitState.duration / 60) / 60;
        let cost = `${timeByHour * unitState.hourPrice}`;
        /* let local = ((unitState.duration / 60) / 60).toLocaleString("ar-EG", {
            style: 'currency',
            currency: 'EGP'
        }); */
        let i = cost.indexOf('.')
        return Number( cost.slice(0, i + 3) );
    }

    return (
        <Layout style={{background: 'transparent'}}>
            <Row style={rowsStyle}>
                <Col style={colsStyle} span={iconSize}>
                    <DollarCircleOutlined />
                </Col>
                <Col style={colsStyle} span={24 - iconSize}>
                    Hour Price: <span style={{color: colors.main}}>{unitState.hourPrice}$</span>
                </Col>
            </Row>
            <Row style={rowsStyle}>
                <Col style={colsStyle} span={iconSize}>
                <FieldTimeOutlined />
                </Col>
                <Col style={colsStyle} span={24 - iconSize}>
                Start Time: <span style={{color: '#FF6CA8'}}>{unitState.startTime}</span>
                </Col>
            </Row>
            <Row style={rowsStyle}>
                <Col style={{...colsStyle, display: 'flex', alignItems: 'center'}} span={iconSize}>
                    <FaRegLightbulb />
                </Col>
                <Col style={colsStyle} span={24 - iconSize}>
                    Status: <span style={{color: unitState.status === 0 ? '#ff6666' :
                        unitState.status === 1 ? '#FFCF4B' :
                        unitState.status === 2 ? '#40e2a0' : 'red'}}>{
                            unitState.status === 0 ? 'Not Work' :
                            unitState.status === 1 ? 'Paused' :
                            unitState.status === 2 ? 'Running...' : 'Unknown Status'
                        }</span>
                    {/* <Space direction="vertical">
                        <Badge status="success" style={{color: '#52c41a'}} text="Running..." />
                        {/* <Badge status="warning" text="Paused" />
                        <Badge status="error" text="Not Work" /> *}
                    </Space> */}
                </Col>
            </Row>
            <Row style={rowsStyle}>
                <Col style={colsStyle} span={iconSize}>
                <HourglassOutlined /> 
                </Col>
                <Col style={colsStyle} span={24 - iconSize}>
                    Duration: <span style={{color: '#9dcce0'}}>{getDuration()}</span>
                </Col>
            </Row>
            {
                unitState.mode !== 'pc' && <Row style={rowsStyle}>
                    <Col style={{...colsStyle, display: 'flex', alignItems: 'center'}} span={iconSize}>
                        <MdMode /> 
                    </Col>
                    <Col style={colsStyle} span={24 - iconSize}>
                        <Select 
                        size='small'
                        options={[
                            {value: 'single', label: 'Single Player'},
                            {value: 'multi', label: 'Multi Player'}
                        ]} 
                        value={unitState.mode} 
                        onChange={value => dispatch({
                            value,
                            type: 'CHANGE_UNIT_MODE',
                            newPrice: value === 'single' ? appSettings[unitType].singlePrice : appSettings[unitType].multiPrice 
                            })} />
                    </Col>
            </Row>
            }
            
            <Row style={{...rowsStyle, marginTop: 12, color: '#faad14'}}>
                <Col style={colsStyle} span={iconSize}>
                    <ShoppingCartOutlined />
                </Col>
                <Col style={colsStyle} span={24 - iconSize}>
                    Orders: {getOrdersTotal()}$
                </Col>
            </Row>
            <Row style={{...rowsStyle, color: '#2980b9'}}>
                <Col style={colsStyle} span={iconSize}>
                    <FieldTimeOutlined />
                </Col>
                <Col style={colsStyle} span={24 - iconSize}>
                    Time Cost: {getTimeCost()}$
                </Col>
            </Row>
            <Row style={{...rowsStyle, color: '#17BBB0'}}>
                <Col style={colsStyle} span={iconSize}>
                    <DollarCircleOutlined />
                </Col>
                <Col style={colsStyle} span={24 - iconSize}>
                    Total Cost: {getOrdersTotal() + getTimeCost()}$
                </Col>
            </Row>
            <Row style={{marginTop: 20}}>
                {
                    unitState.status === 0 ? <Button onClick={() => dispatch({type: 'UNIT_START'})} type="primary">Start</Button> :
                    unitState.status === 1 ? <><Button onClick={() => dispatch({type: 'UNIT_RESUME'})} style={{marginRight: 15}} type="primary">Resume</Button><Button onClick={() => {dispatch({type: 'UNIT_END'}); dispatchSetting({type: 'UNIT_END', payload: unitState.orders})}} style={{background: 'transparent'}} danger>End</Button></> :
                    unitState.status === 2 ? <><Button onClick={() => dispatch({type: 'UNIT_PAUSED'})} style={{marginRight: 15}}>Stop</Button><Button type="primary" onClick={() => setIsOpen(true)} style={{marginRight: 15}}>Order</Button><Button onClick={() => {dispatch({type: 'UNIT_END'}); dispatchSetting({type: 'UNIT_END', payload: unitState.orders})}} style={{background: 'transparent'}} danger>End</Button></> : "Unknown Status"
                }
            </Row>
            <MarketItems unitState={unitState} dispatch={dispatch} ordersTotal={getOrdersTotal()} isOpen={isOpen} setIsOpen={setIsOpen} />
        </Layout>
    );
}

function MarketItems({ unitState, dispatch, ordersTotal, isOpen, setIsOpen }) {

    function handleClick(uid) {

        let myItem = unitState.orders.find(item => item.uid === uid);
        myItem.count++;
        dispatch({type: 'ADD_ORDER', payload: myItem})

    }

    return (
        <Modal
            title='Choose From Market Items'
            className='market-modal custom-modal-footer'
            open={isOpen} onOk={() => setIsOpen(false)}
            onCancel={() => setIsOpen(false)}
            footer={[
                <span key="total" style={{fontSize: 16, fontWeight: 'bold'}}>Orders Total: {ordersTotal}$</span>,
                <Button key='ok' type='primary' onClick={() => setIsOpen(false)}>Ok</Button>
            ]}
            >
            <div className='menu-items'>
                {
                    unitState.orders.map((item, i) => <div key={i} onClick={() => handleClick(item.uid)}>
                        <img src={item.icon.local ? `/images/marketicons/${item.icon.src}` : item.icon.src} width={50} height={50} alt={`market item ${i + 1}`} />
                        <span className='name'>{item.name}</span>
                        <span className='price'>{item.price}$</span>
                    </div>)
                }
            </div>
        </Modal>
    )
}

function UnitEnd({isOpen, setIsOpen}) {
    return (
        <Modal
            title='End Time'
            className='market-modal'
            open={isOpen} onOk={() => setIsOpen(false)}
            onCancel={() => setIsOpen(false)}
            footer={[
                <Button key='ok' type='primary' onClick={() => setIsOpen(false)}>Ok</Button>
            ]}
            >
                Some Content
        </Modal>
    )
}


export default DrawerContent;