import { Button, Grid2, Link, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { FormEvent, useContext, useState } from "react";
import toast from "react-hot-toast";
import { LoginContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const [loginDetails, setLoginDetails] = useState({email:'', password:''})
    const goTo = useNavigate()

    const {login} = useContext(LoginContext)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginDetails({...loginDetails, [event?.target?.name]: event?.target?.value})
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if(loginDetails.email !== '' && loginDetails.password !== '')
        {
            try{
              // const userLogin:any = await axios.post('http://localhost:8080/api/v1/auth/login', loginDetails)
              const userLogin:any = await axios.post('https://e-commerce-mern-mui-s3.onrender.com/api/v1/auth/login', loginDetails)
            if(userLogin.data.success){
                toast.success(userLogin.data.message)
                setLoginDetails({email:'', password:''})
                login(userLogin.data.user)
                localStorage.setItem('user-token', JSON.stringify(userLogin.data.token))
                goTo('/product-gallery')
            }else{
                toast.error(userLogin.data.message)
            }
            }catch(error){
              toast.error((error as any).response.data.message)
            }
            
        }else{
          toast.error('Please enter both email and password')
        }
    }

  return (
    <Paper
      sx={{ width: "400px", height: "500px", margin: "auto", mt: "100px", padding:'5%' }}
      elevation={12}
    >
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={4} mb='50px'>
          <Grid2 sx={{width:'80%'}}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              fullWidth
              onChange={handleChange}
              value={loginDetails.email}
            />
          </Grid2>
          <Grid2 sx={{width:'80%'}}>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              name="password"
              fullWidth
              onChange={handleChange}
              value={loginDetails.password}
            />
          </Grid2>
        </Grid2>
        <Button variant="contained" type="submit" >Login</Button>
      </form>
      <Typography sx={{ mt: 10 }} align="right">
        Not a user?{" "}
        <Link href="/" underline="always">
          {'Register here'}
        </Link>
        </Typography>
    </Paper>
  );
}

export default Login;

