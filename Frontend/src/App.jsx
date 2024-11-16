import "./App.css";
import Header from "./components/Header/header";
import ProductSlider from "./components/ProductSlider/ProductSlider.jsx";
import ProductDetail from "./components/ProductDetail/ProductDetail.jsx";
import { CartProvider } from "./context/cart/CartContext.jsx";

function App() {
  return (
    
    <CartProvider>
      <div className="container">
        <Header />
        <section className="wrapper">
          <ProductSlider />
          <ProductDetail />
        </section>
      </div>
    </CartProvider>
  );
}

export default App;
