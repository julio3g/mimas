import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateBrandController } from '@modules/tools/useCases/createBrand/CreateBrandController';
import { ListBrandsController } from '@modules/tools/useCases/listBrands/ListBrandsController';
import { DeleteBrandController } from '@modules/tools/useCases/deleteBrand/DeleteBrandController';
import { UpdateBrandController } from '@modules/tools/useCases/updateBrand/UpdateBrandController';

const brandsRoutes = Router();

const createBrandController = new CreateBrandController();
const listBrandsController = new ListBrandsController();
const deleteBrandController = new DeleteBrandController();
const updateBrandController = new UpdateBrandController();

brandsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createBrandController.handle,
);
brandsRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  listBrandsController.handle,
);
brandsRoutes.put(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  updateBrandController.handle,
);
brandsRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteBrandController.handle,
);

export { brandsRoutes };
