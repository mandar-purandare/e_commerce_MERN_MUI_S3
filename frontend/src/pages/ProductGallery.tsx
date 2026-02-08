import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  Pagination,
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
  const [metaInfo, setMetaInfo] = useState<any>({});
  const goTo = useNavigate();

  // const getAllProducts = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8080/api/v1/products/get-all-products"
  //     );
  //     if (response.data.success) {
  //       console.log("success");
  //       setProductsArray([...response.data.data]);
  //     } else {
  //       toast.error(response.data.error);
  //     }
  //   } catch (error) {
  //     toast.error((error as any).response.data.message);
  //   }
  // };

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  const getPageResults = async (pageNumber: number) => {
    try {
      // const response = await axios.get(
      //   "http://localhost:8080/api/v1/products/get-page-results",
      //   { params: { page: pageNumber } }
      // );
      const response = await axios.get(
        "https://e-commerce-mern-mui-s3.onrender.com/api/v1/products/get-page-results",
        { params: { page: pageNumber } }
      );
      if (response.data.success) {
        setProductsArray([...response.data.data]);
        const totalPages = response.data.meta.totalPages;
        setMetaInfo({ totalPages });
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error((error as any).response.data.message);
    }
  };

  useEffect(() => {
    getPageResults(1);
  }, []);

  const viewProductDetials = (productId: string | undefined) => {
    goTo(`/view-product/${productId}`);
  };

  console.log("minfo", metaInfo);

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
        <Box sx={{ p: 4 }}>
          <Grid2
            container
            spacing={5}
            sx={{
              width: "85%",
              margin: "auto",
              justifyContent: "center",
            }}
          >
            {productsArray.map((product) => {
              return (
                <Grid2>
                  <Card sx={{ width: 345, height: "425px" }} raised>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="250"
                      sx={{ objectFit: "contain" }}
                      image={product?.imageUrl}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product?.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {/* {product?.description} */}
                        {product?.description.length <= 50
                          ? product?.description
                          : product?.description.substr(0, 18) + "..."}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button
                        size="small"
                        onClick={() => viewProductDetials(product?._id)}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid2>
              );
            })}
          </Grid2>
          <Pagination
            count={metaInfo.totalPages}
            color="primary"
            sx={{  position:'absolute', bottom:50, right:'50%' }}
            onChange={(_, page: number) => getPageResults(page)}
          />
        </Box>
      )}
    </>
  );
}

export default ProductGallery;
