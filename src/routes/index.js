import { Router } from "express";
import email from "../controllers/email";
import auth from "../controllers/auth";

import authToken from "../middleware/authToken";

const apiRouter = Router();

apiRouter.post("/email", authToken, email.create);
apiRouter.get("/token", auth.create);

export { apiRouter };
