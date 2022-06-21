import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, Typography,useMediaQuery,useTheme ,Button} from '@material-ui/core';
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
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
     const [value,setValue] = useState(0);
  const [selectedIndex,setSelectedIndex] = useState(0)
      const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [emailerror, setEmailerror] = useState('');
    const [passworderror, setPassworderror] = useState('');
    const [hasAccount, setHasAccount] = useState(false);
  
    const ClearInputs = () =>{
        setEmail("");
        // setPassword("");

    }
    

    
    const HandleLogin = () =>{
        
        fire.auth().signInWithEmailAndPassword(email, password)
        .catch(err => {
            setError(true);
            switch(err.code){
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailerror(err.message);
                    
                    ClearInputs();

                    break;
                    case "auth/wrong-password":
                        setPassworderror(err.message);
                        
                        ClearInputs();
                        
                        break;
            }
        })
        if( emailerror == ''){
            swal('successful');
        
        }
       
        else{
            swal('unsuccessful');
        }
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

    // const techOptions = {
    //     loop: true,
    //     autoplay: true, 
    //     animationData: technologyAnimation,
    //     rendererSettings: {
    //       preserveAspectRatio: 'xMidYMid slice'
    //     }
    // }


  return (
    
   
  
       <Grid container direction='row'>
            <Grid item className={classes.rowContainer} style={{marginTop:'1em'}}>
                <Typography 
                    variant='h2' 
                    style={{fontFamily:'Pacifico' }}
                    align={matchesMD ? 'center' : undefined}
                >
                     Login or Signup
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
                

                <Grid item container direction='column' lg style={{maxWidth:'100em'}}>
                    <Grid item>
                    <Typography color = 'black' variant='label'  style={{textAlign:'left'}} paragraph align={matchesMD ? 'left' : 'inherit'}>
                    Email
                    </Typography>
                    </Grid>
                    <Grid itemitem container direction='column' lg style={{maxWidth:'100em'}}>
                    <Typography variant='input'  style={{textAlign:'center'}} paragraph align={matchesMD ? 'center' : 'inherit'}>
                   <input variant = 'input'  className={classes.input}
                    required value={email} onChange = {(e) => setEmail(e.target.value)} />
                    </Typography>
                    </Grid>
                    <Grid item  container direction='column' lg style={{maxWidth:'100em'}}>
                    <Typography color = 'black' variant='h5'  style={{textAlign:'center'}} paragraph align={matchesMD ? 'center' : 'inherit'}>
                    <h5>{emailerror}</h5>
                    </Typography>
                    </Grid>
                    <Typography variant='label'  style={{textAlign:'left'}} paragraph align={matchesMD ? 'right' : 'inherit'}>
                    Password
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography color = 'black' variant='h5'  style={{textAlign:'center'}} paragraph align={matchesMD ? 'center' : 'inherit'}>
                    <h5>{passworderror}</h5>
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography variant='input'  style={{textAlign:'left'}} paragraph align={matchesMD ? 'center' : 'inherit'}>
                   <input type='password'  className={classes.input}
                   required value={password} onChange= 
        {(e) => setPassword(e.target.value)} />
                    </Typography>
                    </Grid>
                    <Grid item align='left' style={{marginBottom:'3em'}}>
                        
                        {hasAccount ? (
                <>
                
              <button  variant='contained' className={classes.estimateButton}  
                                
                                style={{color:'blue'}} onClick={HandleLogin}>sign in</button>
                
              <p>dont have an account click on signup!?</p>
              <span onClick={() => setHasAccount(!hasAccount)}>signup</span>
                </>
            ): (
                <>
                
                <button  variant='contained' className={classes.estimateButton}  
                                
                                style={{color:'blue'}} onClick={HandleSignup}>sign up</button>
                               

              <p>have an account? click on sign in </p>
              <span onClick={() => setHasAccount(!hasAccount)}>signin</span>
                </>
            )}
            
                       
                       
                    </Grid>
                    
                    
                    </Grid>
                </Grid>
    
  )
}

export default Login;