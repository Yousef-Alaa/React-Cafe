import React, { useState } from 'react';
import { Button, Table } from 'antd';
import {
    DollarCircleOutlined, FieldTimeOutlined
} from '@ant-design/icons'
// import { AppContext } from "../../App";
import PagesHead from '../../componenets/PagesHead';
import PSSmall from '../../assets/PlayStation-Small.svg'

const columns = [
    { title: '#ID', dataIndex: 'id' },
    { title: 'Icon', dataIndex: 'icon' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Count', dataIndex: 'count' },
    { title: 'Edit', dataIndex: 'edit' },
    { title: 'Delete', dataIndex: 'delete' },
];

const data = [];
for (let i = 1; i < 46; i++) {
    data.push({
        key: i,
        id: `#${i < 10 ? '0' + i : i}`,
        icon: <img src={PSSmall} width='40' height='40' alt='icon' />,
        name: `Item ${i}`,
        price: i * 11,
        count: i * 7,
        edit: <DollarCircleOutlined />, // TODO Will open page or window to edit
        delete: <FieldTimeOutlined />,
    });
}


export default function Market() {

    // const { appSettings: {theme: { colors, isDark }} } = React.useContext(AppContext)

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
            key: 'odd',
            text: 'Select Odd Row',
            onSelect: (changableRowKeys) => {
                let newSelectedRowKeys = [];
                newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                    if (index % 2 !== 0) {
                        return false;
                    }
                    return true;
                });
                setSelectedRowKeys(newSelectedRowKeys);
            },
        },
        {
            key: 'even',
            text: 'Select Even Row',
            onSelect: (changableRowKeys) => {
                let newSelectedRowKeys = [];
                newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                    if (index % 2 !== 0) {
                    return true;
                    }
                    return false;
                });
                setSelectedRowKeys(newSelectedRowKeys);
            },
        },
    ],
    };

    return (
    <div className='market'>
        <PagesHead pageTitle='Market' />
        {/* TODO: Filter & selection in price & count columns */}
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20, paddingBottom: 40}}>
            <Button type='primary' style={{marginRight: 12}}>Add New Item</Button> {/* TODO: Will open page or window to edit */}
            <Button type='primary' danger>Remove Selected Items</Button> {/* TODO: Will open page or window to edit */}
        </div>
    </div>)
}