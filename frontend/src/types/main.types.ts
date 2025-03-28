export type Product = {
  _id?: string,
  name: string,
    price: string,
    productImage?: File | null,
    category: string,
    description: string,
    imageUrl?: string,
    userId: string
}