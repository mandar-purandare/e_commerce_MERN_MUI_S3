import productsModel from "../models/products.model.js";
import usersModel from "../models/users.model.js";
import getSignedImageUrl from "../Utils/generateSignedUrl.utils.js";

export const AddProduct = async (req, res, next) => {
  if (!req.file) return res.status(400).send({ error: "No file uploaded" });
console.log(req.body)
  // Save the image URL in MongoDB
  const newProduct = new productsModel({
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.url,
    description: req.body.description,
    category: req.body.category,
    userId: req.body.userId,
    imageKitFileId: req.body.fileId
  });
  await newProduct.save();

  res.status(201).json({
    success: true,
    message: "Product added successfully",
    imageUrl: req.file.location,
  });
};

export const ViewProduct = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id)
      return res
        .status(401)
        .json({ success: false, message: "Invalid product id" });
    const product = await productsModel.findById(id).lean();
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // const productWithSignedUrl = async () => ({
    //   ...product,
    //   imageUrl: await getSignedImageUrl(product?.imageUrl),
    // });

    // const productDetails = await productWithSignedUrl();

    return res.status(200).json({
      success: true,
      message: "Product found successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const GetAllProducts = async (req, res) => {
  try {
    const allProducts = await productsModel.find().lean();
    
    if (allProducts.length === 0)
      return res
        .status(200)
        .json({ success: true, message: "No Products Found", data: [] });

    // const productsWithUrls = await Promise.all(
    //   allProducts.map(async (product) => ({
    //     ...product,
    //     // imageUrl: await getSignedImageUrl(product.imageUrl),
    //     imageUrl: product.imageUrl,
    //   }))
    // );

    return res
      .status(200)
      .json({ success: true, message: "", data: allProducts });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteProduct = async (req, res) => {
    try{
         const {id} = req.params;
         if(!id) return res.status(400).json({success:false, message:'Invalid delete ID'})
         const removeProduct = await productsModel.deleteOne({_id:id});
        if(!removeProduct) return res.status(500).json({success:false, message:'Unable to delete product'})
          res.status(200).json({success:true, message:'Product deleted successfully'})
    }catch(error){
        return res.status(500).json(error.message);
    }
};

export const getPageResults = async (req, res) => {
  try {
    const { page } = req.query;
    if (!page)
      return res
        .status(401)
        .json({ success: false, message: "Page number required" });

    const [products, total] = await Promise.all([
      productsModel
        .find({})
        .skip((page - 1) * 10)
        .limit(10)
        .lean(),
      productsModel.countDocuments(),
    ]);
    if (!products)
      return res
        .status(401)
        .json({ success: false, message: "No products found" });
      // console.log(products)
    const productsWithUrls = await Promise.all(
      products.map(async (product) => ({
        ...product,
        // imageUrl: await getSignedImageUrl(product.imageUrl),
        imageUrl: product.imageUrl,
      }))
    );

    return res.status(200).json({ success: true, data: productsWithUrls, meta:{totalPages:Math.ceil(total / 10)} });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const AddToCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
      return res.status(400).json({ success: false, message: 'Invalid product or user id' });
    }

    const updatedUser = await usersModel.findByIdAndUpdate(
      userId,
      { $push: { cart: productId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(201).json({
      success: true,
      message: 'Product added to cart successfully',
      data: updatedUser.cart,
    });

  } catch (error) {
    console.error('AddToCart Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

