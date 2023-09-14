import { Router } from "express";
import { ToursControllers } from "../Controllers/ControllersTours.js";

export const createTourRouter = ({TourRouter}) => {
  const ToursRouter = Router()

 const toursController = new ToursControllers({tourModel: TourModel})


TourRouter.get("/", (toursController.getAll))
TourRouter.post("/", (toursController.create))

TourRouter.get("/:id", (toursController.getById))
TourRouter.delete('/:id',(toursController.delete))
TourRouter.patch("/:id", (toursController.update))

return ToursRouter
}
