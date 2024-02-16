import { Router } from "express";
import { AuthControllers } from "../Controllers/ControllersAuth.js";

export const createAuthRouter = ({ userModel }) => {
  const AuthRouter = Router();

  const authController = new AuthControllers({ userModel });

  // Correctly pass the method references without invoking them
  AuthRouter.post("/login", authController.login);

  return AuthRouter;
};