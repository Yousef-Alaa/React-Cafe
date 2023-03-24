import React, { useState } from 'react';
import { Layout, Switch, Typography, Col, InputNumber, Button } from 'antd';
import Icon, { HighlightOutlined } from '@ant-design/icons'
import PagesHead from '../../componenets/PagesHead';
import { RiComputerLine } from 'react-icons/ri';
import { MdOutlineEdit } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';
import { SwatchesPicker } from 'react-color';
import { ReactComponent as PS4Controller } from '../../assets/icons/ps4-controller.svg'
import { ReactComponent as PS5Controller } from '../../assets/icons/ps5-controller.svg'
import { useDispatch, useSelector } from 'react-redux';
import { changePC, changePS4, changePS5 } from '../../redux/unitsSlice'
import { changeTheme, changeBgLinear, changeColors } from '../../redux/themeSlice'

let { Title } = Typography;

export default function Settings() {

    const dispatch = useDispatch();
    const unitsSettings = useSelector(state => state.units)
    const {colors, isDark, bgLinear} = useSelector(state => state.theme)

    const [color, setColor] = useState({ hex: colors.main })
    const [pickerOpen, setPickerOpen] = useState(false)
    const [dark, setDark] = useState(isDark)
    const [linear, setLinear] = useState(bgLinear)

    const [localPC, setLocalPC] = useState({...unitsSettings.pc, dEditing: false, hEditing: false})
    const [localPS4, setLocalPS4] = useState({...unitsSettings.ps4, dEditing: false, sEditing: false, mEditing: false})
    const [localPS5, setLocalPS5] = useState({...unitsSettings.ps5, dEditing: false, sEditing: false, mEditing: false})

    
    const titleStyle = {color: colors.text, width: '100%', display: 'flex', alignItems: 'center', fontSize: 26 }
    const colsStyle = {display: 'flex', alignItems: 'center', fontSize: 16, fontWeight: 'bold'}
    const smallTitleStyle = {marginRight: 10}
    const rowsStyle = (isForm) => {
        const style = {
            padding: '10px 0',
            borderBottom: `1px solid ${colors.text}`,
            marginBottom: '12px'
        }
        if (isForm) {
            style.display = 'flex'
            style.flexFlow = "row wrap"
            style.justifyContent = 'flex-start'
        }
        return style
    }

    function handleSubmitColor(e) {
        e.preventDefault()

        let data = {
            ...colors,
            main: color.hex
        }

        if (color.rgb) data.rgbmain = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;

        dispatch(changeTheme(dark))
        dispatch(changeBgLinear(linear))
        dispatch(changeColors(data))
    }

    return (
    <>
        <PagesHead pageTitle='Settings' />
        <Layout className='setting-page' style={{background: 'transparent'}}>
            <form onSubmit={handleSubmitColor} style={rowsStyle(true)}>
                <Title level={3} style={titleStyle}><HighlightOutlined style={{marginRight: 7}} />Theme</Title>
                <Col span={12} style={{...colsStyle, paddingLeft: 37 }}>
                    <span style={smallTitleStyle}>Theme Mode:</span>
                    <Switch
                            checked={dark}
                            onChange={value => setDark(value)}
                            checkedChildren="Dark"
                            unCheckedChildren="Light"
                            style={{width: 60}}
                        />
                </Col>
                <Col span={12} style={{...colsStyle, position: 'relative'}}>
                    <span style={smallTitleStyle}>Theme Color:</span>
                    <span style={{
                        width: '22px',
                        aspectRatio: '1 / 1',
                        background: color.hex,
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }} onClick={() => setPickerOpen(true)}></span>
                    {
                    pickerOpen && <div style={{position: 'absolute',zIndex: 10, top: 'calc(100% + 10px)'}}>
                        <div onClick={() => setPickerOpen(false)} style={{
                            width: '100%',
                            height: '100%',
                            position: 'fixed',
                            inset: 0}}></div>
                        <SwatchesPicker onChangeComplete={values => {console.log(values); setColor(values); setPickerOpen(false)}} color={color}/>
                    </div>
                    }
                </Col>
                <Col span={24} style={{...colsStyle, paddingLeft: 37, marginTop: 12}}>
                    <span style={smallTitleStyle}>Background Mode:</span>
                    <Switch
                            checked={linear}
                            onChange={value => setLinear(value)}
                            checkedChildren="Linear"
                            unCheckedChildren="Solid"
                            style={{width: 65}}
                        />
                    <Button style={{marginLeft: 'auto'}} type='primary' htmlType="submit">Apply</Button>
                </Col>
            </form>
            <form onSubmit={e => {e.preventDefault(); dispatch(changePC(localPC))}} style={rowsStyle(true)}>
                <Title level={3} style={titleStyle}><RiComputerLine style={{marginRight: 7}} />PC</Title>
                <Col span={12} style={{...colsStyle, paddingLeft: 37}}>
                    {localPC.dEditing ? 
                    <InputNumber
                        id='inp-pc-devices'
                        style={{border: isDark || bgLinear ? 'none' : '2px solid var(--main)', overflow: 'hidden', borderRadius: '6px'}}
                        bordered={false} 
                        addonAfter={<GiConfirmed 
                            onClick={e => {
                                let devices = parseInt( document.querySelector('#inp-pc-devices').value )
                                setLocalPC(data => {return {...data, devices, dEditing: false}});
                            }}
                        />}
                        defaultValue={localPC.devices} /> :
                    <div className='setting-item'>
                        <span>{localPC.devices} Devices</span>
                        <MdOutlineEdit onClick={_ => setLocalPC(data => {return {...data, dEditing: true}})} />
                    </div>
                    }
                    
                </Col>
                <Col span={12} style={colsStyle}>
                    {localPC.hEditing ? 
                    <InputNumber
                        id='inp-pc-price'
                        style={{border: isDark || bgLinear ? 'none' : '2px solid var(--main)', overflow: 'hidden', borderRadius: '6px'}}
                        bordered={false}
                        addonAfter={<GiConfirmed 
                            onClick={e => {
                                let hourPrice = parseInt( document.querySelector('#inp-pc-price').value )
                                setLocalPC(data => {return {...data, hourPrice, hEditing: false}});
                            }}
                        />}
                        defaultValue={localPC.hourPrice} /> :
                    <div className='setting-item'>
                        <span>Price: {localPC.hourPrice}$</span>
                        <MdOutlineEdit onClick={_ => setLocalPC(data => {return {...data, hEditing: true}})} />
                    </div>
                    }
                    <Button style={{marginLeft: 'auto'}} type='primary' htmlType="submit">Apply</Button>
                </Col>
            </form>
            <form onSubmit={e => {e.preventDefault(); dispatch(changePS4(localPS4))}} style={rowsStyle(true)}>
                <Title level={3} style={titleStyle}><Icon component={PS4Controller} style={{marginRight: 7}} />PS4</Title>
                <Col span={8} style={{...colsStyle, paddingLeft: 37}}>
                {localPS4.dEditing ? 
                    <InputNumber
                        id='inp-ps4-devices'
                        style={{border: isDark || bgLinear ? 'none' : '2px solid var(--main)', overflow: 'hidden', borderRadius: '6px'}}
                        bordered={false}
                        addonAfter={<GiConfirmed 
                            onClick={e => {
                                let devices = parseInt( document.querySelector('#inp-ps4-devices').value )
                                setLocalPS4(data => {return {...data, devices, dEditing: false}});
                            }}
                        />}
                        defaultValue={localPS4.devices} /> :
                    <div className='setting-item'>
                        <span>{localPS4.devices} Devices</span>
                        <MdOutlineEdit onClick={_ => setLocalPS4(data => {return {...data, dEditing: true}})} />
                    </div>
                    }
                </Col>
                <Col span={8} style={colsStyle}>
                    {localPS4.sEditing ? 
                        <InputNumber
                            id='inp-ps4-single'
                            style={{border: isDark || bgLinear ? 'none' : '2px solid var(--main)', overflow: 'hidden', borderRadius: '6px'}}
                            bordered={false}
                            addonAfter={<GiConfirmed 
                                onClick={e => {
                                    let singlePrice = parseInt( document.querySelector('#inp-ps4-single').value )
                                    setLocalPS4(data => {return {...data, singlePrice, sEditing: false}});
                                }}
                            />}
                            defaultValue={localPS4.singlePrice} /> :
                        <div className='setting-item'>
                            <span>Single Price: {localPS4.singlePrice}$</span>
                            <MdOutlineEdit onClick={_ => setLocalPS4(data => {return {...data, sEditing: true}})} />
                        </div>
                    }
                </Col>
                <Col span={8} style={colsStyle}>
                {localPS4.mEditing ? 
                        <InputNumber
                            id='inp-ps4-multi'
                            style={{border: isDark || bgLinear ? 'none' : '2px solid var(--main)', overflow: 'hidden', borderRadius: '6px'}}
                            bordered={false}
                            addonAfter={<GiConfirmed 
                                onClick={e => {
                                    let multiPrice = parseInt( document.querySelector('#inp-ps4-multi').value )
                                    setLocalPS4(data => {return {...data, multiPrice, mEditing: false}});
                                }}
                            />}
                            defaultValue={localPS4.multiPrice} /> :
                        <div className='setting-item'>
                            <span>Multi Price: {localPS4.multiPrice}$</span>
                            <MdOutlineEdit onClick={_ => setLocalPS4(data => {return {...data, mEditing: true}})} />
                        </div>
                    }
                    <Button style={{marginLeft: 'auto'}} htmlType='submit' type="primary">Apply</Button>
                </Col>
            </form>
            <form onSubmit={e => {e.preventDefault(); dispatch(changePS5(localPS5))}} style={rowsStyle(true)}>
                <Title level={3} style={titleStyle}><Icon component={PS5Controller} style={{marginRight: 7}} />PS5</Title>
                <Col span={8} style={{...colsStyle, paddingLeft: 37}}>
                {localPS5.dEditing ? 
                    <InputNumber
                        id='inp-ps5-devices'
                        style={{border: isDark || bgLinear ? 'none' : '2px solid var(--main)', overflow: 'hidden', borderRadius: '6px'}}
                        bordered={false} 
                        addonAfter={<GiConfirmed 
                            onClick={e => {
                                let devices = parseInt( document.querySelector('#inp-ps5-devices').value )
                                setLocalPS5(data => {return {...data, devices, dEditing: false}});
                            }}
                        />}
                        defaultValue={localPS5.devices} /> :
                    <div className='setting-item'>
                        <span>{localPS5.devices} Devices</span>
                        <MdOutlineEdit onClick={_ => setLocalPS5(data => {return {...data, dEditing: true}})} />
                    </div>
                    }
                </Col>
                <Col span={8} style={colsStyle}>
                    {localPS5.sEditing ? 
                        <InputNumber
                            id='inp-ps5-single'
                            style={{border: isDark || bgLinear ? 'none' : '2px solid var(--main)', overflow: 'hidden', borderRadius: '6px'}}
                            bordered={false}
                            addonAfter={<GiConfirmed 
                                onClick={e => {
                                    let singlePrice = parseInt( document.querySelector('#inp-ps5-single').value )
                                    setLocalPS5(data => {return {...data, singlePrice, sEditing: false}});
                                }}
                            />}
                            defaultValue={localPS5.singlePrice} /> :
                        <div className='setting-item'>
                            <span>Single Price: {localPS5.singlePrice}$</span>
                            <MdOutlineEdit onClick={_ => setLocalPS5(data => {return {...data, sEditing: true}})} />
                        </div>
                    }
                </Col>
                <Col span={8} style={colsStyle}>
                {localPS5.mEditing ? 
                        <InputNumber
                            id='inp-ps5-multi'
                            style={{border: isDark || bgLinear ? 'none' : '2px solid var(--main)', overflow: 'hidden', borderRadius: '6px'}}
                            bordered={false}
                            addonAfter={<GiConfirmed 
                                onClick={e => {
                                    let multiPrice = parseInt( document.querySelector('#inp-ps5-multi').value )
                                    setLocalPS5(data => {return {...data, multiPrice, mEditing: false}});
                                }}
                            />}
                            defaultValue={localPS5.multiPrice} /> :
                        <div className='setting-item'>
                            <span>Multi Price: {localPS5.multiPrice}$</span>
                            <MdOutlineEdit onClick={_ => setLocalPS5(data => {return {...data, mEditing: true}})} />
                        </div>
                    }
                    <Button style={{marginLeft: 'auto'}} htmlType='submit' type="primary">Apply</Button>
                </Col>
            </form>
        </Layout>
    </>)
}