import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Verify from "./pages/Verify";
import SearchBar from "./components/SearchBar";
import MyProfile from "./components/myProfile";
import Clothes from "./pages/Clothes";
import CustomizePage from "./pages/CustomizePage";
import PhotoeditPage from "./pages/PhotoeditPage";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;


const App = () => {
  return (
    <div className="px-5 sm:px-[5vw]   "  >
      
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/products" element={<Clothes />} />
        <Route path="customize" element={<CustomizePage/>}></Route>
        <Route path="/photoedit" element={<PhotoeditPage/>}></Route>

      </Routes>
      <Footer />
    </div>
  );
};

export default App;
