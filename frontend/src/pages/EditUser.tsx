import {
  Button,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LoginContext } from "../contexts/AuthContext";
import { VisuallyHiddenInput } from "./AddProduct";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { User } from "../types";

interface UserProfile extends User {
    selectedFileName?: String
}

function EditUser() {
  const [userDetails, setUserDetails] = useState<UserProfile>({
    id:'',
    name: "",
    email: "",
    password: "",
    profilePicture: null,
    selectedFileName: ''
  });
  const [error, setError] = useState({
    name: true,
    email: true,
    password: true,
    helperText: "",
  });

  const { state, GetCurrentUser } = useContext(LoginContext);

  useEffect(() => {
    setUserDetails({
      id: state?.user?._id,
      name: state?.user?.name,
      email: state?.user?.email,
      password: 'dummypassword',
      profilePicture: state?.user?.profilePicture,
    });
  }, [state]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [event?.target?.name]: event?.target?.value,
    });
  };

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if files exist and at least one file is selected
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Double-check that we have a valid file object
      if (file && file instanceof Blob) {
        // Create a FileReader and set up the onload handler
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target?.result?.toString().split(",")[1];;
          // Update your state with the base64 string
          setUserDetails(prevState => ({
            ...prevState,
            profilePicture: base64String,
            selectedFileName: file.name
          }));
        };
        
        // Now read the file safely
        reader.readAsDataURL(file);
        
        
      } else {
        toast.error('Invalid file format')
      }
    } else {
      toast.error('No file selected')
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (
      userDetails.name !== "" &&
      userDetails.email !== "" &&
      userDetails.password !== ""
    ) {
      // const userEdit: any = await axios.post(
      //   "http://localhost:8080/api/v1/auth/edit-user",
      //   userDetails
      // );
      const userEdit: any = await axios.post(
        "https://e-commerce-mern-mui-s3.onrender.com/api/v1/auth/edit-user",
        userDetails
      );
      if (userEdit.data.success) {
        toast.success(userEdit.data.message);
        setUserDetails({ id:"",name: "", email: "", password: "", profilePicture: null });
        GetCurrentUser()
      } else {
        toast.error(userEdit.data.error);
      }
    } else {
      setError({
        name: !!userDetails.name,
        email: !!userDetails.email,
        password: !!userDetails.password,
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
      {state?.user ? (
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={4} mb="50px">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            select profile picture
            <VisuallyHiddenInput
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handlePicChange}
            />
          </Button>
          {userDetails.selectedFileName && (
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                Selected: {userDetails.selectedFileName}
              </div>
            )}
            <Grid2 sx={{ width: "80%" }}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                fullWidth
                onChange={handleChange}
                value={userDetails.name}
                error={!error.name}
                helperText={error.helperText}
                slotProps={{ inputLabel: { shrink: true } }}
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
                value={userDetails.email}
                error={!error.email}
                helperText={error.helperText}
                slotProps={{ inputLabel: { shrink: true } }}
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
                value={userDetails.password}
                error={!error.password}
                helperText={error.helperText}
              />
            </Grid2>
          </Grid2>
          <Button variant="contained" type="submit">
            Update
          </Button>
        </form>
      ) : (
        <Typography>Oops, trouble fetching user</Typography>
      )}
    </Paper>
  );
}

export default EditUser;
