import React from 'react';

export default function Images() {
    const images = ['console-filled.svg', 'console-with-gamepad.svg', 'icons8-playstation-500.svg',
                'PS4.svg', 'shapes.png', 'console-solid.svg', 'icons8-playstation-50.svg',
                'logo-short.svg', 'PS5.svg', 'white.png'
            ];

    return (<>
        {
            images.map((item, i) => <img src={`/images/${item}`} style={{maxWidth: 200}} key={i} alt={`img ${i}`} />)
        }
    </>)
}