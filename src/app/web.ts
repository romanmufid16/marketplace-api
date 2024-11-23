import express from "express";
import cors from "cors";
import { ErrorMiddleware } from "../middlewares/error.middleware";
import { publicRoutes } from "../routes/publicApi";
import { authMiddleware } from "../middlewares/auth.middleware";
import { privateRoutes } from "../routes/privateApi";

export const web = express();

web.use(cors());
web.use(express.json());

web.use("/api/v1", publicRoutes);
web.use("/api/v1/", authMiddleware, privateRoutes);


web.use(ErrorMiddleware);