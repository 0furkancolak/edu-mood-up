import { OsController } from "./os.controller";
import { OsService } from "./os.service";

const osService = new OsService();
const osController = new OsController(osService);

export { osService, osController };
