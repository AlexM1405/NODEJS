import { Router } from "express";
import { ToursControllers } from "../Controllers/ControllersTours.js";

 export const TourRouter = Router()


TourRouter.get("/", (ToursControllers.getAll))
TourRouter.post("/", (ToursControllers.create))

TourRouter.get("/:id", (ToursControllers.getById))
TourRouter.delete('/:id',(ToursControllers.delete))
TourRouter.patch("/:id", (ToursControllers.update))
