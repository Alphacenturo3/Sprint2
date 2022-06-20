import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, Typography,useMediaQuery,useTheme ,Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import LandingPage from './LandingPage';
import {fire } from '../firebase'
import firebase from '@firebase/app';
require('firebase/auth');






const Login = (props) => {



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
        // marginRight:40,
        '&:hover':{
            backgroundColor:theme.palette.secondary.light
        }
    },
    textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
    input: {
        color: 'black'
    },

}))
  
    const ClearInputs = () =>{
        setEmail("");
        setPassword("");

    }
    

    
    const HandleLogin = () =>{
        fire.auth().signInWithEmailAndPassword(email, password)
        .catch(err => {
            switch(err.code){
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailerror(err.message);
                    break;
                    case "auth/wrong-password":
                        setPassworderror(err.message);
                        break;
            }
        })
    }

    const HandleSignup = () =>{
        fire.auth().createUserWithEmailAndPassword(email, password)
        .catch(err => {
            switch(err.code){
                case "auth/invalid-email":
            case "auth/email-already-in-use":
                    setEmailerror(err.message);
                    break;
                    case "auth/weak-password":
                        setPassworderror(err.message);
                        break;
            }
        })
    }


    const HandleLogout = ()  =>{
        fire.auth().signOut();
        console.log("logged out");
    }

    const AuthListner =() =>{
        fire.auth().onAuthStateChanged(user => {
            if(user){
                ClearInputs();
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
const classes = useStyles();

    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
     const [value,setValue] = useState(0);
  const [selectedIndex,setSelectedIndex] = useState(0)
      const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailerror, setEmailerror] = useState('');
    const [passworderror, setPassworderror] = useState('');
    const [hasAccount, setHasAccount] = useState(false);
    // const techOptions = {
    //     loop: true,
    //     autoplay: true, 
    //     animationData: technologyAnimation,
    //     rendererSettings: {
    //       preserveAspectRatio: 'xMidYMid slice'
    //     }
    // }


  return (
    
   
  
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

                <Grid item container direction='column' lg style={{maxWidth:'100em'}}>
                    <Grid item>
                    <Typography color = 'black' variant='label'  style={{textAlign:'center'}} paragraph align={matchesMD ? 'center' : 'inherit'}>
                    Username
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography variant='input'  style={{textAlign:'center'}} paragraph align={matchesMD ? 'center' : 'inherit'}>
                   <input variant = 'input'  className={classes.input}
                    required value={email} onChange = {(e) => setEmail(e.target.value)} />
                    </Typography>
                    </Grid>
                    <Typography variant='label'  style={{textAlign:'right'}} paragraph align={matchesMD ? 'right' : 'inherit'}>
                    Password
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography variant='input'  style={{textAlign:'center'}} paragraph align={matchesMD ? 'center' : 'inherit'}>
                   <input variant = 'input'  className={classes.input}
                   required value={password} onChange= 
        {(e) => setPassword(e.target.value)} />
                    </Typography>
                    </Grid>
                    <Grid item align='center' style={{marginBottom:'3em'}}>
                        
                        {hasAccount ? (
                <>
                <Link to ='/'>
              <button  variant='contained' className={classes.estimateButton}  
                                
                                style={{color:'blue'}} onClick={HandleLogin}>sign in</button>
                </Link>
              <p>dont have an account click on signup!?</p>
              <span onClick={() => setHasAccount(!hasAccount)}>signup</span>
                </>
            ): (
                <>
                <Link to = '/'>
                <button  variant='contained' className={classes.estimateButton}  
                                
                                style={{color:'blue'}} onClick={HandleSignup}>sign up</button>
                                </Link>

              <p>have an account? click on sign in </p>
              <span onClick={() => setHasAccount(!hasAccount)}>signin</span>
                </>
            )}
             <button onClick={HandleLogout}>Logout</button>
                       
                       
                    </Grid>
                    
                    
                    </Grid>
                </Grid>
            
            
    
  )
}

export default Login;