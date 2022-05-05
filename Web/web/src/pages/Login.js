import React, {useEffect, useState} from 'react'
import { Grid,Paper, TextField, Button, Typography,Link } from '@mui/material'
import '../styles/Login.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [token,setToken]=useState('')

    const navigate=useNavigate()

    function handleLoginButtonClick () {
        if(username==''){
            alert("Username field is empty!")
        }

        if(password==''){
            alert("Password field is empty!")
        }
        else {
            let user = {
                username: username,
                password: password
            }
            axios.post('http://3.66.157.143/api/Auth/login', user)
                .then(res => {
                    setToken(res.data)
                    console.log(res.data)

                })
                .catch(err => {
                    console.log(err)
                })

            navigate("/dashboard", {state: username})
        }
    }

    const handleUsernameChange = event => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }

    return(
        <div>
            <div className="loginTitle">
                <h2>Welcome!</h2>
            </div>
            <div className="Container">
                <Grid>
                    <Paper elevation={10} className="paperStyle">
                        <Grid align='center' >
                            <h2>Sign In</h2>
                        </Grid>
                        <TextField label='Username' placeholder='Enter username' fullWidth required onChange={handleUsernameChange}/>
                        <TextField label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handlePasswordChange}/>
                        <div className="btnstyle">
                        <Button onClick={handleLoginButtonClick} type="submit" variant="contained" color="primary">Sign in</Button>
                        </div>
                        <Typography className="linkToRegister"> Don't have an account?
                            <Link href="/register"  >
                                Sign Up
                            </Link>
                        </Typography>
                    </Paper>
                </Grid>
            </div>
        </div>
    )
}

export default Login