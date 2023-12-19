import { Router } from "express";
import { ToursControllers } from "../Controllers/ControllersTours.js";


export const createTourRouter = ({tourModel}) => {
  const ToursRouter = Router()

 const toursController = new ToursControllers({ tourModel })


ToursRouter.get("/", (toursController.getAll));
ToursRouter.get("/:id", (toursController.getById));

ToursRouter.post("/", (toursController.create));
ToursRouter.delete('/:id',(toursController.delete));
ToursRouter.patch("/:id", (toursController.update));

return ToursRouter
}
