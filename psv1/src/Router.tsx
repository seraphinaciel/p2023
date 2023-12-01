import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./routes/Main";
import Product from "./routes/Product";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
