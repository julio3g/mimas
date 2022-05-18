import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { DeleteUserController } from '@modules/accounts/useCases/deleteUser/DeleteUserController';
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController';
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController';
import { ProfileUserController } from '@modules/accounts/useCases/profileUserUseCase/ProfileUserController';
export const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const profileUserController = new ProfileUserController();
usersRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createUserController.handle,
);
usersRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  listUsersController.handle,
);
usersRoutes.put(':/id', ensureAuthenticated, updateUserController.handle);
usersRoutes.delete('/:id', ensureAuthenticated, deleteUserController.handle);
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);
