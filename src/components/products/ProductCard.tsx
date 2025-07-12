import { Product } from "@/types/Product";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  onEditClick?: (product: Product) => void;
}

const ProductCard = ({ product, onEditClick }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-64 bg-gray-100 flex items-center justify-center">
        {product.imageSrc ? (
          <img
            src={product.imageSrc}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-gray-400 flex items-center justify-center h-full w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-lg mb-3">
          {product.price.toLocaleString("vi-VN")} đ
        </p>
        {onEditClick && (
          <Button
            onClick={() => onEditClick(product)}
            variant="outline"
            size="sm"
            className="w-full"
          >
            Chỉnh sửa
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
