import { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateProductModal from "@/components/products/CreateProductModal";
import ProductCard from "@/components/products/ProductCard";
import { useProductsData } from "@/hooks/useProductsData";
import { toast } from "@/components/ui/sonner";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    title,
    formFields,
    buttonText,
    products,
    loading,
    error,
    refreshData,
  } = useProductsData();

  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      setLocalProducts(products);
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(localProducts);
    } else {
      const filtered = localProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, localProducts]);

  const handleCreateProduct = async (newProductData: Omit<Product, "id">) => {
    try {
      const newProduct: Product = {
        ...newProductData,
        id: `product-${Date.now()}`,
      };

      setLocalProducts((prev) => [newProduct, ...prev]);
      setIsModalOpen(false);

      toast.success("Tạo sản phẩm thành công!", {
        description: `Sản phẩm "${newProduct.name}" đã được tạo.`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      toast.error("Có lỗi xảy ra khi tạo sản phẩm.", {
        description: "Vui lòng thử lại sau.",
        duration: 3000,
      });
      throw error;
    }
  };

  const handleEditProduct = async (
    productId: string,
    updatedProductData: Omit<Product, "id">
  ) => {
    try {
      setLocalProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...updatedProductData, id: productId } : p
        )
      );

      setIsModalOpen(false);
      setSelectedProduct(null);

      toast.success("Cập nhật sản phẩm thành công!", {
        description: `Sản phẩm "${updatedProductData.name}" đã được cập nhật.`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      toast.error("Có lỗi xảy ra khi cập nhật sản phẩm.", {
        description: "Vui lòng thử lại sau.",
        duration: 3000,
      });
      throw error;
    }
  };

  const openCreateModal = () => {
    setIsEditMode(false);
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setIsEditMode(true);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Đang tải...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 mb-4">Có lỗi xảy ra khi tải dữ liệu</p>
        <Button onClick={refreshData}>Thử lại</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden p-4 rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-end">
        <div className="w-1/2">
          <Input
            type="search"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <Button onClick={openCreateModal} className="w-full md:w-auto">
          {buttonText}
        </Button>
      </div>

      <CreateProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateProduct={!isEditMode ? handleCreateProduct : undefined}
        onEditProduct={isEditMode ? handleEditProduct : undefined}
        formFields={formFields}
        buttonText={isEditMode ? "Lưu thay đổi" : buttonText}
        product={selectedProduct}
        isEditMode={isEditMode}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id || index}
              product={product}
              onEditClick={openEditModal}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            {searchTerm
              ? "Không tìm thấy sản phẩm phù hợp"
              : "Không có sản phẩm nào để hiển thị"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
