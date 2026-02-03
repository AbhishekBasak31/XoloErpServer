import express from "express";
import { upload } from "../../Middleware/Multer.js";
import { 
  getAboutPage, 
  createAboutPage, 
  updateAboutPage,
  deleteAboutPage
} from "../../Controllers/AboutPage/AboutPage.js";
import { authenticate } from "../../Middleware/AuthMiddlewares.js";

const AboutPagerouter = express.Router();

// Define Upload Fields
const uploadFields = [
  // Single Images
  { name: "OurStoryImg", maxCount: 1 },
  { name: "OurMissionImg", maxCount: 1 },
  { name: "OurVisionImg", maxCount: 1 },
];

// Add dynamic fields for Team (up to 20 members) and Cards (up to 10 cards)
for (let i = 0; i < 20; i++) {
  uploadFields.push({ name: `TeamImg_${i}`, maxCount: 1 });
}

const aboutPageUploads = upload.fields(uploadFields);

AboutPagerouter.get("/", getAboutPage);
AboutPagerouter.post("/", authenticate, aboutPageUploads, createAboutPage);
AboutPagerouter.patch("/:id", authenticate, aboutPageUploads, updateAboutPage);
AboutPagerouter.delete("/:id", authenticate, deleteAboutPage);

export default AboutPagerouter;