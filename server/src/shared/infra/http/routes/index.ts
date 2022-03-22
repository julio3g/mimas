import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { brandsRoutes } from './brands.routes';
import { toolsRoutes } from './tools.routes';
import { usersRoutes } from './users.routes';
import { passwordRoutes } from './password.routes';
import { commentsRoutes } from './comments.routes';
import { usingRoutes } from './using.routes';

const router = Router();

router.use('/brands', brandsRoutes);
router.use('/users', usersRoutes);
router.use('/tools', toolsRoutes);
router.use('/comments', commentsRoutes);
router.use('/password', passwordRoutes);
router.use('/using', usingRoutes);
router.use(authenticateRoutes);

export { router };
