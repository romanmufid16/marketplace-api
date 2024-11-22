import express from "express";
import cors from "cors";
import { ErrorMiddleware } from "../middlewares/error.middleware";
import { publicRoutes } from "../routes/publicApi";

export const web = express();

web.use(cors());
web.use(express.json());

web.use("/api/v1", publicRoutes);


web.use(ErrorMiddleware);