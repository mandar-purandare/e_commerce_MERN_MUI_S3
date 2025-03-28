import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductGallery from "./pages/ProductGallery";
import AddProduct from "./pages/AddProduct";
import EditUser from "./pages/EditUser";
import ViewProduct from "./pages/ViewProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Register/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="product-gallery" element={<ProductGallery/>}/>
        <Route path="add-product" element={<AddProduct/>}/>
        <Route path="edit-user" element={<EditUser/>}/>
        <Route path="view-product/:id" element={<ViewProduct/>}/>
      </Route>
    </Routes>
  );
}

export default App;
