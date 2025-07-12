import { useState, useEffect } from "react";
import { Product, FormField } from "@/types/Product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProduct?: (product: Omit<Product, "id">) => Promise<void>;
  onEditProduct?: (
    productId: string,
    product: Omit<Product, "id">
  ) => Promise<void>;
  formFields?: FormField[];
  buttonText?: string;
  product?: Product | null;
  isEditMode?: boolean;
}

export const CreateProductModal = ({
  isOpen,
  onClose,
  onCreateProduct,
  onEditProduct,
  formFields = [],
  buttonText = "Tạo sản phẩm",
  product = null,
  isEditMode = false,
}: CreateProductModalProps) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditMode && product) {
      setFormValues({
        productName: product.name,
        price: product.price,
      });
      setImagePreview(product.imageSrc || null);
    } else if (!isEditMode) {
      handleReset();
    }
  }, [product, isEditMode]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setImagePreview(event.target.result);
        }
      };
      reader.readAsDataURL(file);

      setFormValues({
        ...formValues,
        imageUrl: file,
      });
    }
  };

  const handleChange = (field: FormField, value: any) => {
    setFormValues({
      ...formValues,
      [field.name]: value,
    });

    if (errors[field.name]) {
      setErrors({
        ...errors,
        [field.name]: "",
      });
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    formFields.forEach((field) => {
      if (field.required && !formValues[field.name]) {
        newErrors[field.name] = `${field.label} không được để trống`;
        isValid = false;
        return;
      }

      if (formValues[field.name]) {
        if (
          field.type === "text" &&
          field.maxLength &&
          formValues[field.name].length > field.maxLength
        ) {
          newErrors[
            field.name
          ] = `${field.label} không được vượt quá ${field.maxLength} ký tự`;
          isValid = false;
        }

        if (field.type === "number") {
          const numValue = parseFloat(formValues[field.name]);

          if (isNaN(numValue)) {
            newErrors[field.name] = `${field.label} phải là số`;
            isValid = false;
          } else {
            if (field.minValue !== undefined && numValue < field.minValue) {
              newErrors[
                field.name
              ] = `${field.label} không được nhỏ hơn ${field.minValue}`;
              isValid = false;
            }
            if (field.maxValue !== undefined && numValue > field.maxValue) {
              newErrors[
                field.name
              ] = `${field.label} không được lớn hơn ${field.maxValue}`;
              isValid = false;
            }
          }
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    try {
      const productData: Omit<Product, "id"> = {
        name: formValues.productName || "",
        price: parseFloat(formValues.price) || 0,
        imageSrc: imagePreview || undefined,
      };

      if (isEditMode && product?.id && onEditProduct) {
        await onEditProduct(product.id, productData);
      } else if (!isEditMode && onCreateProduct) {
        await onCreateProduct(productData);
      }

      handleReset();
      onClose();
    } catch (error) {
      console.error(
        isEditMode ? "Lỗi khi cập nhật sản phẩm:" : "Lỗi khi tạo sản phẩm:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormValues({});
    setImageFile(null);
    setImagePreview(null);
    setErrors({});
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
        return (
          <div key={field.name}>
            <Label htmlFor={field.name} className="text-base">
              {field.required && <span className="text-red-500">*</span>}{" "}
              {field.label}
            </Label>
            <Input
              id={field.name}
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
              className={`mt-1 ${errors[field.name] ? "border-red-500" : ""}`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        );

      case "number":
        return (
          <div key={field.name}>
            <Label htmlFor={field.name} className="text-base">
              {field.required && <span className="text-red-500">*</span>}{" "}
              {field.label}
            </Label>
            <Input
              id={field.name}
              type="text"
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
              className={`mt-1 ${errors[field.name] ? "border-red-500" : ""}`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        );

      case "file_upload":
        return (
          <div key={field.name}>
            <Label htmlFor={field.name} className="text-base">
              {field.required && <span className="text-red-500">*</span>}{" "}
              {field.label}
            </Label>
            <div className="mt-1">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span>Chọn tệp tin (tối đa 5MB)</span>
                <input
                  id={field.name}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Xem trước"
                  className="h-32 w-auto object-contain border rounded"
                />
              </div>
            )}
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleReset();
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditMode ? "Chỉnh sửa sản phẩm" : "Tạo sản phẩm mới"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {formFields.map((field) => renderField(field))}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                handleReset();
                onClose();
              }}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Đang xử lý..." : buttonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
