import { useState, useEffect, useMemo } from "react";
import { ApiResponse, Product, FormField } from "@/types/Product";
import productApi from "@/services/api/productApi";

interface UseProductsDataReturn {
  title: string;
  formFields: FormField[];
  buttonText: string;
  products: Product[];
  loading: boolean;
  error: Error | null;
  refreshData: () => Promise<void>;
}

export const useProductsData = (): UseProductsDataReturn => {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await productApi.getProducts();
      console.log("API Response:", response);
      setApiData(response);
    } catch (err) {
      console.error("Error fetching products data:", err);
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { title, formFields, buttonText, products } = useMemo(() => {
    let title = "";
    let formFields: FormField[] = [];
    let buttonText = "Tạo sản phẩm";
    let products: Product[] = [];

    if (apiData?.data) {
      console.log("Processing API data:", apiData.data);

      apiData.data.forEach((component) => {
        switch (component.type) {
          case "Label":
            if (component.customAttributes.label) {
              title = component.customAttributes.label.text;
              console.log("Found title:", title);
            }
            break;

          case "ProductSubmitForm":
            if (component.customAttributes.form) {
              formFields = component.customAttributes.form;
              console.log("Found form fields:", formFields);
            }
            break;

          case "Button":
            if (component.customAttributes.button) {
              buttonText = component.customAttributes.button.text;
              console.log("Found button text:", buttonText);
            }
            break;

          case "ProductList":
            if (component.customAttributes.productlist) {
              products = component.customAttributes.productlist.items;
              console.log("Found products:", products);
            }
            break;
        }
      });
    }

    return { title, formFields, buttonText, products };
  }, [apiData]);

  return {
    title,
    formFields,
    buttonText,
    products,
    loading,
    error,
    refreshData: fetchData,
  };
};

export default useProductsData;
