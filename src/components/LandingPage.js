import React , {useEffect, useState,} from 'react';
import { makeStyles, Grid, Typography,useMediaQuery,useTheme ,Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import {fire } from '../firebase'
import firebase from '@firebase/app';
require('firebase/auth');


const useStyles = makeStyles(theme=>({
    rowContainer:{
        paddingLeft:'5em',
        paddingRight:'5em',
      
        [theme.breakpoints.down('sm')]:{
            paddingLeft:'1.5em',
            paddingRight:'1.5em'
        }
    },
    estimateButton:{
        ...theme.typography.estimate,
        borderRadius:50,
        backgroundColor:theme.palette.common.orange,
        height:45,
        width:200,
        '&:hover':{
            backgroundColor:theme.palette.secondary.light
        }
    },

}))

export default function LandingPage(props){
    
    const classes = useStyles();

    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
      const [user, setUser] = useState('');

    const HandleLogout = ()  =>{
        fire.auth().signOut();
        
        swal({
  title: "Are you sure?",
  text: "Are you sure that you want to logout?",
  icon: "warning",
  dangerMode: true,
})
.then(willDelete => {
  if (willDelete) {
    setTimeout(function () {
window.location.pathname = '/';
swal("LoggedOut!", "You have successfully logged out");
}, 1000)
    
  }
});


    }

    const AuthListner =() =>{
        fire.auth().onAuthStateChanged(user => {
            if(user){
                
                setUser(user);
            }
            else{
                setUser("");
            }
        })
    }
    useEffect(() => {
        AuthListner();
    }, [])


    return(
        <Grid container direction='column'>
            <Grid item className={classes.rowContainer} style={{marginTop:'1em'}}>
                <Typography 
                    variant='h2' 
                    style={{fontFamily:'Pacifico' }}
                    align={matchesMD ? 'center' : undefined}
                >
                     Welcome to Our Bank
                </Typography>
            </Grid>
            <Grid 
                item 
                container 
                direction={matchesMD ? 'column' : 'row' }
                className={classes.rowContainer}
                alignItems='center'
                style={{marginTop:' 2em',marginBottom:'1.7em'}}
            >
                <Grid item lg>
                    <img 
                        src='https://pbs.twimg.com/media/EUkgup2WAAAoke0?format=jpg&name=small'
                        alt='mountain' 
                        style={{maxWidth:matchesSM ? 300 :'40em',
                                marginRight:matchesMD ? 0 : '5em',
                                marginBottom:matchesMD ? '5em' :0
                            }} 
                    />
                </Grid>

                <Grid item container direction='column' lg style={{maxWidth:'40em'}}>
                    <Grid item>
                        <Typography variant='h4' style={{textAlign:'center'}} gutterBottom align={matchesMD ? 'center' : 'inherit'}>
                            Our BANKING SYSTEM
                        </Typography>
                    </Grid>
                    <Grid item>
                    <Typography variant='body1'  style={{textAlign:'center'}} paragraph align={matchesMD ? 'center' : 'inherit'}>
                    Simpler. Faster. Safer
                    </Typography>
                    
                        <Grid item align='center' style={{marginBottom:'3em'}}>
                            
                        {user ? (
                            
                        <Button variant='contained' className={classes.estimateButton}  
                                
                                style={{color:'black'}}
                                onClick = {HandleLogout}
                        >
                        Logout
                        </Button>
                       
                        ):(
                             <Link to = './login'>
                        <Button variant='contained' className={classes.estimateButton}  
                                
                                style={{color:'black'}}
                                onClick = {()=>{
                                    props.setValue(3)
                                }}
                        >
                            SignUp or Login!
                        </Button>
                        </Link>
                        )}
                    
                    
                       
                    </Grid>
                    
                    
                    </Grid>
                </Grid>
            </Grid>
           

        </Grid>
    )
                            }

                            