import React, { useContext } from "react";
import { Col, Row, Typography } from 'antd';
import { AppContext } from "../../App";
import PS4Unit from '../../componenets/Old_Design/Playstation4Unit';
import PS5Unit from '../../componenets/Old_Design/Playstation5Unit';
import PCUnit from '../../componenets/Old_Design/PCUnit';
import Shapes from '../../assets/shapes.png';

const { Title } = Typography;

function Old() {

    const { appSettings: { theme: {colors}} } = useContext(AppContext)

    return (<>
        <Row justify='space-between' align='center' style={{marginBlock: '5px 15px'}}>
            <Col style={{display: 'flex', alignItems: 'center'}}><Title style={{color: colors.text, margin: 0}}>Old Design</Title></Col>
            <Col style={{display: 'flex', alignItems: 'center'}}><img width='150' style={{filter: `drop-shadow(2px 4px 5px ${colors.text})`}} src={Shapes} alt='Controls' /></Col>
        </Row>
        <Row gutter={[16, 16]} style={{paddingBottom: 15}}>
            {Array.from(Array(3)).fill(0).map((item, ind) => <PCUnit key={ind} index={ind} />)}
            {Array.from(Array(3)).fill(0).map((item, ind) => <PS4Unit key={ind} index={ind} />)}
            {Array.from(Array(3)).fill(0).map((item, ind) => <PS5Unit key={ind} index={ind} />)}
        </Row>
    </>);
}

export default Old;