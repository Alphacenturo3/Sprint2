import React, { useState, useEffect, useRef } from 'react';
import { Button,Grid,useTheme,useMediaQuery,makeStyles,Typography,TextField,CircularProgress,Snackbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'
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
 const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const userRef = useRef();
    const errRef = useRef();
   
     const [value,setValue] = useState(0);
  const [selectedIndex,setSelectedIndex] = useState(0)
      const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setsuccess] = useState(false);
    const [validuser, setValidUser] = useState(false);
    const [validpassword, setValidpassword] = useState(false);
    const [emailerror, setEmailerror] = useState('');
    const [passworderror, setPassworderror] = useState('');
    const [hasAccount, setHasAccount] = useState(false);
  
    const ClearInputs = () =>{
        setEmail("");
        // setPassword("");

    }
    

    
    const HandleLogin = async () =>{
        
         try {
    await fire.auth().signInWithEmailAndPassword(email, password);
  } 
      catch (err) { 
            switch(err.code){
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailerror(err.message);
                    swal(err.message)
                    break;
                    case "auth/wrong-password":
                        setPassworderror(err.message);
                        swal(err.message);
                        ClearInputs();
                        
                        break;
            }
        }
        setTimeout(function () {
window.location.pathname = '/';
}, 3000)
    };

    const HandleSignup = () =>{
        fire.auth().createUserWithEmailAndPassword(email, password)
        .catch(err => {
            switch(err.code){
                case "auth/invalid-email":
            case "auth/email-already-in-use":
                    setEmailerror(err.message);
                    swal(err.message);
                    break;
                    case "auth/weak-password":
                        setPassworderror(err.message);
                        break;
            }
        })
        
               setTimeout(function () {
                swal("successs");
window.location.pathname = '/';

}, 5000)
    
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
     useEffect(() => {
        setValidUser(emailerror);
    }, [email])
     useEffect(() => {
        setValidpassword(passworderror);
    }, [password])
    // const techOptions = {
    //     loop: true,
    //     autoplay: true, 
    //     animationData: technologyAnimation,
    //     rendererSettings: {
    //       preserveAspectRatio: 'xMidYMid slice'
    //     }
    // }


  return (
    
   <Grid 
        container 
        direction='column' 
        justifyContent='center'
        style={{
            marginTop:matchesSM ? '4em'  : matchesMD ? '5em' : undefined,
            marginBottom: matchesMD ? '5em' : undefined
        }}
    >
        <Grid item>
            <Grid item container direction='column' style={{alignItems:'center'}}>
                <Grid item>
                    <Typography 
                        variant='h3'
                        align= 'center'
                        style={{lineHeight:1}}
                    >
                        Login or SignUp
                    </Typography>
                </Grid>
                <Grid 
                    item 
                    container
                    direction='column' 
                    style={{maxWidth:matchesXS ? '20em' : matchesSM? '25em' :'40em'}}
                >
                <Grid item style={{marginTop:'2em' ,marginBottom:'0.5em'}}>
                    <Typography style={{color:theme.palette.common.blue}}>Username</Typography>
                    <TextField 
                        id="username" 
                        variant="outlined"
                        fullWidth
                       required value={email} onChange = {(e) => setEmail(e.target.value)}
                    />
                    
                </Grid>
                <Grid item style={{marginBottom:'0.5em'}}>
                    <Typography style={{color:theme.palette.common.blue}}>Password</Typography>
                    <TextField 
                        id="password"
                        variant="outlined"
                        type='password'
                        fullWidth
                         required value={password} onChange= 
        {(e) => setPassword(e.target.value)} 
                        
                    />
                </Grid>
                
                
                
                <Grid item container justifyContent='center' style={{marginTop:'2em'}}>
                    {hasAccount ? (
                <>
                
              <button  variant='contained' className={classes.estimateButton}  
                                
                                style={{color:'blue'}} onClick={HandleLogin}>Login</button>
                
              <p>dont have an account?  </p>
              <span onClick={() => setHasAccount(!hasAccount)}>signup</span>
                </>
            ): (
                <>
                
                <button  variant='contained' className={classes.estimateButton}  
                                
                                style={{color:'blue'}} onClick={HandleSignup}>sign up</button>
                               

              <p>have an account? </p>
              <span onClick={() => setHasAccount(!hasAccount)}>signin</span>
                </>
            )}
                </Grid>
            </Grid>
            </Grid>
        </Grid>
       
     

    </Grid>
    );
  
    
  
            }

export default Login;

