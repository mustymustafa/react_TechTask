import * as React from 'react'



const URL = 'https://myuom-server.herokuapp.com'

export default class Places extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: []
        }

    }


    async componentDidMount(){
        try{
            const fetchData = await fetch(`${URL}/api/v1/getlocation`, {
                method: 'POST',
                body: JSON.stringify({ category: 'Library' }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
            });

            if(fetchData.ok){
                console.log(fetchData)
            }
            console.log('something went wrong')
       

        } catch(err) {
            console.log(err.toString())
        }
    }


    render(){
        return (
            <div/>
        )
    }


}