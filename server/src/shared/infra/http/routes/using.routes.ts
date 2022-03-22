import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUsingController } from '@modules/using/useCases/createUsing/CreateUsingController';
import { DevolutionUsingController } from '@modules/using/useCases/devolutionUsing/DevolutionUsingController';
import { ListUsingByUserController } from '@modules/using/useCases/listUsingByUser/ListUsingByUserController';

const createUsingController = new CreateUsingController();
const devolutionUsingController = new DevolutionUsingController();
const listUsingByUserController = new ListUsingByUserController();

const usingRoutes = Router();

usingRoutes.post('/', ensureAuthenticated, createUsingController.handle);
usingRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionUsingController.handle,
);
usingRoutes.get('/user', ensureAuthenticated, listUsingByUserController.handle);

export { usingRoutes };
