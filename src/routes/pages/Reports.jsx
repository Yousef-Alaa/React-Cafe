import React from 'react';
import { AppContext } from "../../App";
import PagesHead from '../../componenets/PagesHead';


export default function Reports() {

    const { appSettings: {theme: {colors, isDark}} } = React.useContext(AppContext)

    return (
    <>
        <PagesHead pageTitle='Reports' />
    </>)
}