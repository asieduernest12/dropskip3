import { ProductQuery } from "@/routes/products"

interface ProductSearchResult extends ProductQuery {
  sales: number
  ratings: number
  price: number
  productLink: string
  buyLink: string
}

export default const temuSearch = (productInfo:ProductQuery)=>{
  // make fetch to temu + search params
  // optional filter by price
  // extract results 
}