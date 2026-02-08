import { Button, Grid2, Link, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

function Register() {
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: true,
    email: true,
    password: true,
    helperText: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterDetails({
      ...registerDetails,
      [event?.target?.name]: event?.target?.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (
      registerDetails.name !== "" &&
      registerDetails.email !== "" &&
      registerDetails.password !== ""
    ) {
      // const userRegistration: any = await axios.post(
      //   "http://localhost:8080/api/v1/auth/register",
      //   registerDetails
      // );
      const userRegistration: any = await axios.post(
        "https://e-commerce-mern-mui-s3.onrender.com/api/v1/auth/register",
        registerDetails
      );
      if (userRegistration.data.success) {
        toast.success("User registered successfully!");
        setRegisterDetails({ name: "", email: "", password: "" });
      } else {
        toast.error("Unable to register user. Please try again");
      }
    } else {
      setError({
        name: !!registerDetails.name,
        email: !!registerDetails.email,
        password: !!registerDetails.password,
        helperText: "This field is required",
      });
    }
  };

  return (
    <Paper
      sx={{
        width: "400px",
        height: "500px",
        margin: "auto",
        mt: "100px",
        padding: "5%",
      }}
      elevation={12}
    >
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={4} mb="50px">
          <Grid2 sx={{ width: "80%" }}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              fullWidth
              onChange={handleChange}
              value={registerDetails.name}
              error={!error.name}
              helperText={error.helperText}
            />
          </Grid2>
          <Grid2 sx={{ width: "80%" }}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              fullWidth
              onChange={handleChange}
              value={registerDetails.email}
              error={!error.email}
              helperText={error.helperText}
            />
          </Grid2>
          <Grid2 sx={{ width: "80%" }}>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              name="password"
              fullWidth
              onChange={handleChange}
              value={registerDetails.password}
              error={!error.password}
              helperText={error.helperText}
            />
          </Grid2>
        </Grid2>
        <Button variant="contained" type="submit">
          Register
        </Button>
      </form>
      <Typography sx={{ mt: 10 }} align="right">
        Already a user?{" "}
        <Link href="/login" underline="always">
          {'Login'}
        </Link>
      </Typography>
    </Paper>
  );
}

export default Register;
