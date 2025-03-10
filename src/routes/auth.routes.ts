import express from "express";
import {
  signupController,
  issueTokenController,
  verifyTokenController,
  revokeTokenController
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signupController);
router.post("/issue", issueTokenController);
router.get("/verify", verifyTokenController);
router.post("/revoke", revokeTokenController);

export default router;
