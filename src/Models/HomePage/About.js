import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const HomeAboutSchema = new SCHEMA(
  {
   Htext:{
      type: String,
      required: true,
   },
   Dtext:{
      type: String,
      required: true,
   },
   tab1Icon:{
    type: String,
      required: true,
   },
   tab2Icon:{
    type: String,
      required: true,
   },
   tab3Icon:{
    type: String,
      required: true,
   },
   tab1Name:{
    type: String,
      required: true,
   },
   tab2Name:{
    type: String,
      required: true,
   },
   tab3Name:{
    type: String,
      required: true,
   },
   tab1Desc:{
    type: String,
      required: true,
   },
   tab1Bp1:{
    type: String,
      required: true,
   },
   tab1Bp2:{
    type: String,
      required: true,
   },
   tab1Bp3:{
    type: String,
      required: true,
   },
   tab1img:{
     type: String,
      required: true,
  },

   tab2Desc:{
    type: String,
      required: true,
   },
   tab2Bp1:{
    type: String,
      required: true,
   },
   tab2Bp2:{
    type: String,
      required: true,
   },
   tab2Bp3:{
    type: String,
      required: true,
   },
   tab2img:{
     type: String,
      required: true,
  },
   tab3Desc:{
    type: String,
      required: true,
   },
   tab3Bp1:{
    type: String,
      required: true,
   },
   tab3Bp2:{
    type: String,
      required: true,
   },
   tab3Bp3:{
    type: String,
      required: true,
   },
  tab3img:{
     type: String,
      required: true,
  },
  CTAbuttonname:{
      type: String,
      required: true, 
  },
  CTAbuttonUrl:{
      type: String,
      required: true, 
  }
  },{ timestamps: true }
);
export const HomeAbout = mongoose.model("HomeAbout", HomeAboutSchema);