import { Button, Grid2, Paper, styled, TextField } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { LoginContext } from "../contexts/AuthContext";
import { Product } from "../types/main.types";


export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function AddProduct() {

  const { state } = React.useContext(LoginContext);

  const [formData, setFormData] = useState<Product>({
    name: '',
    price: '',
    productImage: null,
    category: '',
    description: '',
    userId: state?.user?._id
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
  
    if (files && files.length > 0) {
      // Handle file input separately
      setFormData((prevData) => ({
        ...prevData,
        productImage: files[0], // Store file object
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!!formData.name && !!formData.price && !!formData.productImage && !!formData.description) {
      try {
        // Creating a FormData object
        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("userId", state?.user?._id);
  
        // Append the image file
        if (formData.productImage) {
          data.append("imageUrl", formData.productImage); 
        }
  
        // const response = await axios.post(
        //   "http://localhost:8080/api/v1/products/add-product", 
        //   data,          
        //   { headers: { "Content-Type": "multipart/form-data" } }
        // );

        const response = await axios.post(
          "https://e-commerce-mern-mui-s3.onrender.com/api/v1/products/add-product", 
          data,          
          { headers: { "Content-Type": "multipart/form-data" } }
        );
  
        if (response.data.success) {
          toast.success(response.data.message);
          setFormData({
            name: "",
            price: "",
            productImage: null,
            category: "",
            description: "",
            userId: state?.user?._id
          });
        }
      } catch (error) {
        console.log(error)
        toast.error((error as any).response.data.message);
      }
    } else {
      toast.error("Please enter all the details");
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid2 container spacing={4} mb="50px">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              name="productImage"
              onChange={handleChange}
              accept="image/*"
            />
          </Button>
          {formData.productImage && (
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                Selected: {formData.productImage.name}
              </div>
            )}
          <Grid2 sx={{ width: "80%" }}>
            <TextField
              id="outlined-basic"
              label="Product Name"
              variant="outlined"
              name="name"
              fullWidth
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 sx={{ width: "80%" }}>
            <TextField
              id="outlined-price-input"
              label="Product Price"
              type="text"
              autoComplete="current-password"
              name="price"
              fullWidth
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 sx={{ width: "80%" }}>
          <TextField
              id="outlined-description-input"
              label="Product Description"
              type="text"
              autoComplete="product-description"
              name="description"
              fullWidth
              onChange={handleChange}
            />
            </Grid2>
            <Grid2 sx={{ width: "80%" }}>
          <TextField
              id="outlined-description-input"
              label="Product Category"
              type="text"
              autoComplete="product-category"
              name="category"
              fullWidth
              onChange={handleChange}
            />
            </Grid2>
        </Grid2>
        <Button variant="contained" type="submit">
          ADD PRODUCT
        </Button>
      </form>
    </Paper>
  );
}

export default AddProduct;

