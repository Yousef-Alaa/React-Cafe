import React from "react";
import One from '../../componenets/test/One'
import Two from '../../componenets/test/Two'
import Three from '../../componenets/test/Three'
import supabase from "../../supabaseClient";

function Users() {


    async function getdata() {
        const { data, error } = await supabase.from('jo').select()
        console.log(data);
        // return data;

        const { errror } = await supabase
            .from('jo').insert({id: data.length + 1, created_at: (data.length + 1) * 111})
            // .insert({
            //     uid: 2, 
            //     // devices: 8,
            //     price: 12,
            //     info: JSON.stringify({
            //         hoursSystem: 24,
            //         arr: [1,2,3,4,5,6,7,8,9],
            //         pc: {
            //             count: 16,
            //             hourPrice: 17,
            //         },
            //         ps4: {
            //             count: 8,
            //             singlePrice: 20,
            //             multiPrice: 25
            //         },
            //         ps5: {
            //             count: 4,
            //             singlePrice: 30,
            //             multiPrice: 35
            //         }
            //     })
        // })

        console.log('Done !!');
    }

    

    return (<>
        <button onClick={getdata}>Fetch</button>
        <One />
        ==================================
        <Two />
        ==================================
        <Three />
    </>);
}

export default Users;