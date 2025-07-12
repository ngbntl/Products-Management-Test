import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { ROUTERS } from "@/constant";
import Home from "@/pages/Home";
import Products from "./pages/products";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={ROUTERS.HOME} element={<Home />} />
        <Route path={ROUTERS.PRODUCTS} element={<Products />} />
      </Route>
    </Routes>
  );
};

export default Router;
