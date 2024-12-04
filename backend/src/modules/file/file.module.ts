import { FileController } from "./file.controller";
import { FileService } from "./file.service";

const fileService = new FileService();
const fileController = new FileController(fileService);

export { fileService, fileController };
