import "./App.css";

import ProductsListing from "./assets/components/ProductsListing";
import products from "./assets/data/productsData";

function App() {
  return (
    <>
      <ProductsListing products={products} />
    </>
  );
}

export default App;
