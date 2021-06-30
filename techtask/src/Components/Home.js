import logo from '../../src/logo.svg';
import '../../src/App.css';

import React, { useState, useEffect } from 'react'

import Places from './Places'

function Home({props}) {

    const [selected, setSelected] = useState('')

    useEffect(() => {
        setSelected('')
    }, [])


    const getSelected = (d) => {
        setSelected(d)
    }


    return (
        <div className="Home">
            
            <h3 style={{ padding: 20 }}>Selected Location: {selected}</h3>
            <Places name={getSelected} />
        </div>
    );

}

export default Home;
