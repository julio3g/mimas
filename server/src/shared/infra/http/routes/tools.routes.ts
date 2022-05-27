import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateToolController } from "@modules/tools/useCases/createTool/CreateToolController";
import { ListToolsController } from "@modules/tools/useCases/listTools/ListToolsController";
import { DeleteToolController } from "@modules/tools/useCases/deleteTool/DeleteToolController";
import { UpdateToolController } from "@modules/tools/useCases/updateTool/UpdateToolController";
import { UploadToolImageController } from "@modules/tools/useCases/uploadToolImage/UploadToolImageController";
import { DeleteToolImageController } from "@modules/tools/useCases/deleteToolImage/DeleteToolImageController";

export const toolsRoutes = Router();

const createToolController = new CreateToolController();
const listToolsController = new ListToolsController();
const updateToolController = new UpdateToolController();
const deleteToolController = new DeleteToolController();
const uploadToolImageController = new UploadToolImageController();
const deleteToolImageController = new DeleteToolImageController();

const uploadToolImages = multer(uploadConfig);

toolsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createToolController.handle,
);
toolsRoutes.get("/", listToolsController.handle);
toolsRoutes.put(
  "/:id",
  ensureAuthenticated,
  ensureAdmin,
  updateToolController.handle,
);
toolsRoutes.delete(
  "/:id",
  ensureAuthenticated,
  ensureAdmin,
  deleteToolController.handle,
);
toolsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadToolImages.single("image"),
  uploadToolImageController.handle,
);
toolsRoutes.delete(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  deleteToolImageController.handle,
);
