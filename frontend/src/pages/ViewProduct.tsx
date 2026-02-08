import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../types/main.types";
import toast from "react-hot-toast";
import { LoginContext } from "../contexts/AuthContext";

function ViewProduct() {
  const [productDetails, setProductDetails] = useState<Product>();
  const productId = useParams().id;
  const { state } = useContext(LoginContext);
  const goTo = useNavigate();

  const userId = state.user._id;
  console.log(userId);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/products/view-product",
          { params: { id: productId } }
        );
        if (response.data.success) {
          setProductDetails(response.data.data);
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    };
    getProductDetails();
  }, [productId]);

  const addToCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/products/add-to-cart",
        { productId, userId }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/products/delete-product/${productId}/${productDetails?.imageKitFileId}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        goTo('/product-gallery')
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Box
      display="flex"
      height="90vh"
      justifyContent="center"
      alignItems="center"
    >
      <Card
        sx={{
          width: "350px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          padding: 4,
        }}
        raised
      >
        <CardMedia
          component="img"
          alt="product image"
          height="250"
          sx={{ objectFit: "contain" }}
          image={productDetails?.imageUrl}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            rowGap: 2,
          }}
        >
          <Typography gutterBottom variant="h4" component="div">
            {productDetails?.name}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {productDetails?.description}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            ₹{productDetails?.price}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button size="small" variant="contained">
            Buy
          </Button>
          <Button size="small" variant="contained" onClick={addToCart}>
            Add To Cart
          </Button>
          <Button size="small" variant="contained" onClick={deleteProduct}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ViewProduct;
