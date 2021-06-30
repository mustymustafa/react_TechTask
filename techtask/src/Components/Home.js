//PARENT COMPONENT

import '../../src/App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { useState, useEffect } from 'react'

import Places from './Places'

function Home({location, history}) {

    const [selected, setSelected] = useState('please select a location...')

    useEffect(() => {
        if(location.state === 'ok'){
            setSelected('')
            history.replace('', null)
            window.alert('Selection will be cleared and List will be Refreshed')
        }

    }, [location.state, history])


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
