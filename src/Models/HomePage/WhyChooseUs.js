import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const WhyChooseUsSchema = new SCHEMA(
  {
    Dtext:{
        type: String,
      required: true,
   },
    Htext:{
        type: String,
      required: true,
   },
    card1Vd:{
        type: String,
      required: true,
   },
    card1VdaltTag:{
        type: String,
      required: true,
   },
    card1Htext:{
        type: String,
      required: true,
   },
    card1Dtext:{
        type: String,
      required: true,
   },
    card2Vd:{
        type: String,
      required: true, 
   },
    card2VdaltTag:{
        type: String,
      required: true,
   },
    card2Htext:{
        type: String,
      required: true,
   },
    card2Dtext:{
        type: String,
      required: true,
   },
  card3Vd:{
        type: String,
      required: true, 
   },
    card3VdaltTag:{
        type: String,
      required: true,
   },
    card3Htext:{
        type: String,
      required: true,
   },
    card3Dtext:{
        type: String,
      required: true,
   },
  card4Vd:{
        type: String,
      required: true, 
   },
    card4VdaltTag:{
        type: String,
      required: true,
   },
    card4Htext:{
        type: String,
      required: true,
   },
    card4Dtext:{
        type: String,
      required: true,
   },

  },{ timestamps: true }
);
export const WhyChooseUs = mongoose.model("WhyChooseUs", WhyChooseUsSchema);