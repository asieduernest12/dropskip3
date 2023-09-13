import { Router } from 'express';
const router = Router();

export interface ProductQuery {
  name: string;
  category: string;
  manufacturer: string;
  distributor: string;
  price: number;
  sku: string;
  currency: string;
  sortHost: string;
}

router.get('/', (req, res) => {});

export default router;
