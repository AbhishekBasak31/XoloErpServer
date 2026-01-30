import express from "express";
import {
  createAboutPage,
  getAboutPage,
  updateAboutPage,
  deleteAboutPage,
} from "../../Controllers/AboutPage/AboutPage.js";
import { upload } from "../../Middleware/Multer.js";
import { authenticate } from "../../Middleware/AuthMiddlewares.js";

const AboutPageRouter = express.Router();

// Define Image Fields for Multer
// NOTE: For dynamic team images (TeamImg_0, TeamImg_1...), we generally use upload.any() or define a large max count
// But to be precise, we can list them if we have a max limit, or use a loop.
// Here I'll use a mix of known fields and a generous limit for team fields.

const explicitFields = [
  { name: "BannerImg1", maxCount: 1 },
  { name: "BannerImg2", maxCount: 1 },
  { name: "BannerImg3", maxCount: 1 },
  { name: "OurVisionVideo", maxCount: 1 },
  { name: "OurvisionBp1Icon", maxCount: 1 },
  { name: "OurvisionBp2Icon", maxCount: 1 },
  { name: "Card1CounterIcon", maxCount: 1 },
  { name: "Card2CounterIcon", maxCount: 1 },
  { name: "Card3CounterIcon", maxCount: 1 },
];

// Add Team fields (assuming max 20 members for safety)
for(let i=0; i<20; i++) {
    explicitFields.push({ name: `TeamImg_${i}`, maxCount: 1 });
}

const aboutUploads = upload.fields(explicitFields);

AboutPageRouter.get("/", getAboutPage);
AboutPageRouter.post("/",authenticate, aboutUploads, createAboutPage);
AboutPageRouter.patch("/",authenticate, aboutUploads, updateAboutPage);
AboutPageRouter.delete("/",authenticate, deleteAboutPage);

export default AboutPageRouter;