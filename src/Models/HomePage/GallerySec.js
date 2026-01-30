// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const VedioSchema = new mongoose.Schema({
  Videourl: { 
    type: String, 
    required: true 
  },
  altTag:{
     type: String, 
    required: true 
  },
  isPopular: { 
    type: Boolean, 
    default: false 
  }
});
const GallerySecSchema = new SCHEMA(
  {
   tag:{
      type: String,
      required: true,
   },
   Htext:{
        type: String,
      required: true,
   },
   SDesc:{
        type: String,
      required: true,
   },
   galleryvideo:[VedioSchema]

   
  },
  { timestamps: true }
);

export const GallerySec = mongoose.model("GallerySec", GallerySecSchema);
export default GallerySec;
