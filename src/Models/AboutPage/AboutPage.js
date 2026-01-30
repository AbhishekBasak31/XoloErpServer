import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";
const MemberSchema = new mongoose.Schema({
  Name: { 
    type: String, 
    required: true 
  },
  Desig:{
    type: String, 
    required: true 
  },
  Img:{
      type: String, 
    required: true 
  }
});
const AboutPageSchema = new SCHEMA(
  {
   MainHtext:{
     type: String,
      required: true, 
   },
   MainDtext:{
     type: String,
      required: true, 
   },
    SinceYear:{
      type: String,
      required: true, 
    },
    BannerImg1:{
        type: String,
      required: true,   
   },
   BannerImg1AltTag:{
        type: String,
      required: true,   
   },
   BannerImg2:{
        type: String,
      required: true,   
   },
   BannerImg2AltTag:{
        type: String,
      required: true,   
   },
   BannerImg3:{
        type: String,
      required: true,   
   },
   BannerImg3AltTag:{
        type: String,
      required: true,   
   },
    underBannerLeftsidetext:{
        type: String,
      required: true,   
   },
    underBannerRightsidetext:{
        type: String,
      required: true,
   }, 
   OurVisionVideo:{
        type: String,
      required: true,
   }, 
   OurVisionVideoAltTag:{
        type: String,
      required: true,
   },
   OurvisionTag:{
        type: String,
      required: true,
   }, 
  OurvisionHtext:{
        type: String,
      required: true,
   }, 
  OurvisionBp1Htext:{
        type: String,
      required: true,
   }, 
  OurvisionBp2Htext:{
        type: String,
      required: true,
   },
   OurvisionBp1Dtext:{
     type: String,
      required: true,
   }, 
   OurvisionBp2Dtext:{
     type: String,
      required: true,
   },
   OurvisionBp1Icon:{
     type: String,
      required: true,
   }, 
   OurvisionBp2Icon:{
     type: String,
      required: true,
   },
   OurvisionNote:{
     type: String,
      required: true,
   }, 
   CountersectionHtext:{
     type: String,
      required: true,
   }, 
  Card1Counter:{
     type: String,
      required: true,
   }, 
   Card1CounterHText:{
     type: String,
      required: true,
   },
   Card1CounterText:{
     type: String,
      required: true,
   }, 
   Card1CounterIcon:{
      type: String,
      required: true,
   },
   Card2Counter:{
     type: String,
      required: true,
   },
   Card2CounterHText:{
     type: String,
      required: true,
   },  
   Card2CounterText:{
     type: String,
      required: true,
   }, 
   Card2CounterIcon:{
      type: String,
      required: true,
   },
   Card3Counter:{
     type: String,
      required: true,
   }, 
   Card3CounterHText:{
     type: String,
      required: true,
   }, 
   Card3CounterText:{
     type: String,
      required: true,
   }, 
   Card3CounterIcon:{
      type: String,
      required: true,
   },
  TeamTag:{
      type: String,
      required: true,
   },
  Teamhtext:{
      type: String,
      required: true,
   },
   TeamMember:[MemberSchema],
  CTAHtext:{
      type: String,
      required: true,
   },
  CTADtext:{
      type: String,
      required: true,
   },
   CTAButtontext:{
       type: String,
      required: true,
   },
   CTAButtonUrl:{
       type: String,
      required: true,
   }

  },{ timestamps: true }
);
export const AboutPage = mongoose.model("AboutPage", AboutPageSchema);