export type ProductResponse = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  }
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export type ProductsType = {
  title?: string,
  searchParam?: string,
  productsData?: ProductResponse[]
}