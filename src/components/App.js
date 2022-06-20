import { ThemeProvider } from '@material-ui/styles';
import React , {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import CreateUser from './CreateUser';
import History from './History';
import Transfer from './Transfer';
import Footer from './ui/Footer';
import Header from './ui/Header';
import theme from "./ui/Theme";
import Users from './Users';
import LogHeaders from './ui/LogHeader'
// import './ui/App.css'
import './ui/History.css'
import LandingPage from './LandingPage';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import Login from './Login'
import {fire } from '../firebase'
import firebase from '@firebase/app';
// import SignIn from './login2'
require('firebase/auth');


function App() {
  const [value,setValue] = useState(0);
  const [selectedIndex,setSelectedIndex] = useState(0)
      const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailerror, setEmailerror] = useState('');
    const [passworderror, setPassworderror] = useState('');
    const [hasAccount, setHasAccount] = useState(false);

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


  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      {user ? (
        <Header value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          />
      ): (
        <LogHeaders value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          />
      )}
        
          <Switch>
          <Route exact path='/'  
          render={(props)=>(
                <LandingPage
                  {...props} 
                  setValue={setValue}
                  setSelectedIndex={setSelectedIndex}
                />
              )} 
            />
          <Route exact path='/users'  
              render={(props)=>(
                <Users
                  {...props} 
                  setValue={setValue}
                  setSelectedIndex={setSelectedIndex}
                />
              )}
          />
          <Route exact path='/history' component={History} />
          <Route exact path='/transfer' component={Transfer} />
          <Route exact path='/create' component={CreateUser} />
          <Route exact path='/contact' component={ContactUs} />
          <Route exact path='/about' component={AboutUs} />
          <Route exact path='/login' component={Login} />
           {/* <Route exact path='/login2' component={SignIn} /> */}
         
          </Switch>
          {
         
         
          
          }
      <Footer value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex} 
      />
    </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
