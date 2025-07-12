export interface Product {
  id?: string;
  name: string;
  price: number;
  imageSrc?: string;
}

export interface FormField {
  label: string;
  name: string;
  required?: boolean;
  type: string;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
}

export interface ApiComponent {
  type: string;
  customAttributes: {
    label?: {
      text: string;
    };
    form?: FormField[];
    button?: {
      text: string;
    };
    productlist?: {
      items: Product[];
    };
  };
}

export interface ApiResponse {
  code: string;
  message: string;
  data: ApiComponent[];
}
