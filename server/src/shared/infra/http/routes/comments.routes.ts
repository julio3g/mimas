import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateCommentController } from '@modules/comments/useCases/createComment/CreateCommentController';
import { DeleteCommentController } from '@modules/comments/useCases/deleteComment/DeleteCommentController';
import { UpdateCommentController } from '@modules/comments/useCases/updateComment/UpdateCommentController';

const commentsRoutes = Router();

const createCommentController = new CreateCommentController();
const deleteCommentController = new DeleteCommentController();
const updateCommentController = new UpdateCommentController();

commentsRoutes.post('/', ensureAuthenticated, createCommentController.handle);
commentsRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteCommentController.handle,
);
commentsRoutes.put(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  updateCommentController.handle,
);

export { commentsRoutes };
