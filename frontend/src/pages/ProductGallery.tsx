import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from "@mui/material";
import NoProductsSvg from "../assets/empty-box.svg";
import { useEffect, useState } from "react";
import { Product } from "../types/main.types";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductGallery() {
  const [productsArray, setProductsArray] = useState<Product[]>([]);
  const goTo = useNavigate()

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/products/get-all-products"
      );
      if (response.data.success) {
        console.log("success");
        setProductsArray([...response.data.data]);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error((error as any).response.data.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const viewProductDetials = (productId:string | undefined) => {
    goTo(`/view-product/${productId}`)
  }

  return (
    <>
      {productsArray.length === 0 ? (
        <>
          <Typography variant="h1" sx={{ textAlign: "center", marginTop: 7 }}>
            No products listed 🫢
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "80vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={NoProductsSvg}
              alt="no products"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </>
      ) : (
        <Box sx={{p:4}}>
        <Grid2 container spacing={4}>
        {productsArray.map((product) => {
          return(
            <Grid2>
            <Card sx={{ width: 345, height:'500px' }} raised>
            <CardMedia
              component="img"
              alt="green iguana"
              height="250"
              sx={{objectFit:'contain'}}
              image={product?.imageUrl}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product?.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small" onClick={() => viewProductDetials(product?._id)}>View Details</Button>
            </CardActions>
          </Card>
          </Grid2>
          )
        })}
          {/* <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card> */}
        </Grid2>
        </Box>
      )}
    </>
  );
}

export default ProductGallery;
