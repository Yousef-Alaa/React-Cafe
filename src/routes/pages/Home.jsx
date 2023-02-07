import React from "react";
import Unit from '../../componenets/Unit';
import PagesHead from "../../componenets/PagesHead";
import { AppContext } from '../../App';
import { useContext } from "react";

function Home() {

    let { appSettings: {pc, ps4, ps5} } = useContext(AppContext);

    const style = {
        paddingBottom: 15,
        display: 'grid',
        gap: 15,
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gridTemplateRows: `repeat(1, 1fr)`,
    }

    return (<>
        <PagesHead pageTitle='Home' />
        <div style={style}>
            {Array(pc.devices).fill(0).map((item, ind) => <Unit key={ind} index={ind} unitType='pc' />)}
            {Array(ps4.devices).fill(0).map((item, ind) => <Unit key={ind} index={ind} unitType='ps4' />)}
            {Array(ps5.devices).fill(0).map((item, ind) => <Unit key={ind} index={ind} unitType='ps5' />)}
        </div>
    </>);
}

export default Home;