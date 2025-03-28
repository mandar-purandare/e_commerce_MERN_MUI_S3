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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/main.types";
import toast from "react-hot-toast";

function ViewProduct() {
  const [productDetails, setProductDetails] = useState<Product>();
  const productId = useParams().id;

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

  console.log(productDetails);

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
          padding:4
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
        <CardContent sx={{flexGrow:1, display:'flex', flexDirection:'column', rowGap:2}}>
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
        <CardActions sx={{ justifyContent: "center"}}>
          <Button size="small" variant="contained">
            Buy
          </Button>
          <Button size="small" variant="contained">
            Add To Card
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ViewProduct;
