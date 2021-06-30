import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";



const URL = 'https://myuom-server.herokuapp.com'

class Places extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            selected: ''
        }

    }


    async componentDidMount(){
        try{
            this.setState({isLoading: true})
            const fetchData = await fetch(`${URL}/api/v1/getlocation`, {
                method: 'POST',
                body: JSON.stringify({ category: 'Library' }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
            });

            const value = await fetchData.json();
            if(fetchData.ok){
                this.setState({data: value.locations})
                this.setState({ isLoading: false })
                console.log(value)
            } else{
            console.log('something went wrong' + value.message)
                this.setState({ isLoading: false })
            }

        } catch(err) {
            console.log(err.toString())
        }
    }

    getSelected = (i, info) => {
        this.props.name(i)
        this.setState({selected: i})


    }

    update = (i, info) => {
        this.props.name(i)

        //navigate to info screen
        this.props.history.push({
            pathname: '/info',
            state: { i, info }
        })

    }







    render(){
        const {data} = this.state
        console.log(data)
     

        return (
            <div>
                {
                data.map((i) => 
                    <List className={'classes.root'} style={{
                        width: '100%',
                        maxWidth: '100%',
                        backgroundColor: 'black',
                        color: 'white'}}>

            
                            <ListItem alignItems="start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={i.pic} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={i.name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                style={{ display: 'inline', color: 'white' }}
                                                component="span"
                                                variant="body2"
                                                className={'classes.inline'}
                                                color="white"
                                            >
                                                {i.location}
                                            </Typography>

                                            

                                        </React.Fragment>
                                        
                                    }
                                />

                                <Button onClick={() => this.getSelected(i.name)}  style={{padding: 20, left: -20, height: 40}} variant="outlined" color="secondary">
                                    Select
                                </Button>
                            
                            {this.state.selected === i.name ? (<Button onClick={() => this.update(i.name, { id: i._id, name: i.name, pic: i.pic, location: i.location })} style={{ padding: 20, height: 40 }} variant="outlined" color="primary">
                                Update
                            </Button>) : (<div/>)
                               
                            }
                            
                               
                            </ListItem>


                        
                       

                        <Divider  variant="inset" component="li" />
                        </List>
                )
                }
            </div>
        )
    }


}

export default withRouter(Places)

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));