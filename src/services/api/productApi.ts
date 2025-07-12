import axiosClient from "./axiosClient";
import { ApiResponse, Product } from "@/types/Product";

const productApi = {
  getProducts: () => {
    const url = "/products/management";
    return axiosClient.get<ApiResponse>(url);
  },
};

export default productApi;
