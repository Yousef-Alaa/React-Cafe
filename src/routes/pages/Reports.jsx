import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PagesHead from '../../componenets/PagesHead';


export default function Reports() {

    const reportsList = useSelector(state => state.reports);
    const dispatch = useDispatch()

    return (
    <>
        <PagesHead pageTitle='Reports' />
        <div className="reports">
            <div className='head'>
                <span>type</span>
                <span>value</span>
                <span>time</span>
                <span>date</span>
                <span>item</span>
            </div>
            {
                reportsList.map((item, i) => <div key={i}>
                    <span>{item.type}</span>
                    <span>{item.value}$</span>
                    <span>{item.time}</span>
                    <span>{item.date}</span>
                    <span>{item.itemName ? item.itemName : '-'}</span>
                </div>)
            }
            <span style={{padding: '12px 10px', display: 'block', fontWeight: "bold"}}>Total: {reportsList.reduce((x, y) => x + y.value, 0)}$</span>
            <button onClick={() => dispatch({type: 'reports/increment', payload: 10})}>Click</button>
        </div>
    </>)
}