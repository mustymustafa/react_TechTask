//CHILD COMPONENT 2

import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router, withRouter } from "react-router-dom";




const URL = 'https://myuom-server.herokuapp.com'

 class Info extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            place: {},
            isLoading: false,
            name: '',
            loading: false
        }

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    async componentDidMount() {
        //REDIRECTS BACK TO HOMEPAGE IF YOU TRY TO ACCESS THE INFO PAGE THROUGH THE URL

        if (!this.props.location.state){
            return this.props.history.push({
                pathname: '/'
            })
        }
        console.log(this.props.location.state.info)
        this.setState({place: this.props.location.state.info })

    }

    onSubmit = async (e) => {
        e.preventDefault();
        const {name} = this.state;
        const id = this.state.place.id
        if(name.length < 1){
            return window.alert('please enter a name')
        }
        try {
            this.setState({ loading: true })
            const fetchData = await fetch(`${URL}/api/v1/location/update`, {
                method: 'POST',
                body: JSON.stringify({id, name: name}),
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
            });

            const value = await fetchData.json();
            if (fetchData.ok) {
                
                this.setState({ loading: false })
                this.props.history.push({
                    pathname: '/',
                    state: 'ok'
                })

           

            } else {
                console.log('something went wrong' + value.message)
                this.setState({ loading: false })
            }

        } catch (err) {
            console.log(err.toString())
        }
    


    };


    render() {
    
        return (
            <div style={{height: '100%'}}> 
             
                
                <Card style={{ maxWidth: '100%', alignSelf: "center", padding: 20, backgroundColor: "black", marginTop: 50}}>
                    <CardActionArea>
                     
                        <img style={{width: 200, borderRadius: 100, height: 200}} src={this.state.place.pic} alt="i"/>
                        <CardContent style={{ color: "white"}}>
                            <Typography style={{ color: "white" }} gutterBottom variant="h5" component="h2">
                                {this.state.place.name}
                            </Typography>
                            <Typography style={{ color: "white" }} variant="body2" color="textSecondary" component="p">
                                {this.state.place.location}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>


     
               
                <Card style={{ maxWidth: '100%', height: 200, borderWidth: 1, borderColor: 'black', alignSelf: "center", padding: 20, marginTop: 70 }}>
                        <CardActionArea>

                            <form noValidate autoComplete="off">

                            <TextField onChange={this.onChange}
                                        name="name"
                            style={{borderWidth: 1, borderColor: 'black'}} id="standard-secondary" label="Update Name" color="secondary" />


                            </form>
                        </CardActionArea>
                    <Button onClick={this.onSubmit} type="submit" style={{ padding: 20, top: 50, height: 40, width: 200 }} variant="outlined" color="secondary">
                        Submit
                    </Button>
                    </Card>
                   
           

              

               

            </div>
        )
    }


}


export default withRouter(Info);

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