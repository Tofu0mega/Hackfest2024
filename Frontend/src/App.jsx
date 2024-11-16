
import Navbar from "./Components/Navbar/Navbar.jsx";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import virtualChangingRoom from "./Pages/virtualChangingRoom.jsx";
import ShopCategory from "./Pages/TryCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footers/Footer.jsx";
import sunglass_banner from "../src/Components/assets/Frontend_Assets/Banner-Sunglass.png"
import earrings_banner from "../src/Components/assets/Frontend_Assets/Banner-Earrings.png"
import necklace_banner from "../src/Components/assets/Frontend_Assets/Banner-Necklace.png"
import LoginSignup from "./Pages/LoginSignup.jsx";


function App() {

  return(
  <>

    <div >
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<virtualChangingRoom/>}/>
        <Route path="/Sunglasses" element={<ShopCategory banner={sunglass_banner} category="Sunglasses" />}/>
        <Route path="/Earrings" element={<ShopCategory banner={earrings_banner} category="Earrings"/>}/>
        <Route path="/Necklace" element={<ShopCategory banner={necklace_banner} category="Necklace"/>}/>
        
        <Route path="/product" element={<Product/>}>
          <Route path=":productId" element={<Product/>}/>
        </Route>
        <Route path="/cart" element= {<Cart/>}/> 
        <Route path="/login" element={<LoginSignup/>}/>

      </Routes>
      <Footer/>
      </BrowserRouter>
      

    </div>
    </>)
    

  
}

export default App;
