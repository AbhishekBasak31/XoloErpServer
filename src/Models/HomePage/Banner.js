import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const HomeBannerSchema = new SCHEMA(
  {
   Htext1:{
        type: String,
      required: true, 
   },
   Dtext1:{
     type: String,
      required: true,
   },
   Htext2:{
        type: String,
      required: true, 
   },
   Dtext2:{
     type: String,
      required: true,
   },
   Htext3:{
        type: String,
      required: true, 
   },
   Dtext3:{
     type: String,
      required: true,
   },
   Htext4:{
        type: String,
      required: true, 
   },
   Dtext4:{
     type: String,
      required: true,
   },
   
   midtext:{
       type: String,
      required: true, 
   },
   button1text:{
   type: String,
      required: true, 
   },
   button1Url:{
   type: String,
      required: true, 
   },
    button2text:{
   type: String,
      required: true, 
   },
   button2Url:{
   type: String,
      required: true, 
   }

  },{ timestamps: true }
);
export const HomeBanner = mongoose.model("HomeBanner", HomeBannerSchema);


//  Dtext1:{
//         type: String,
//       required: true,
     
//    }, 
//     Dtext2:{
//         type: String,
//       required: true,
     
//    },
//     Dtext3:{
//         type: String,
//       required: true,
     
//    },
//    CardLogo1:{
//    type: String,
//       required: true,
//    },
//    CardLogo2:{
//         type: String,
//       required: true,
//    },
//    CardLogo3:{
//         type: String,
//       required: true,
//    },
//    CardHtext1:{
//         type: String,
//       required: true,
//    },
//    CardHtext2:{
//         type: String,
//       required: true,
//    },
//    CardHtext3:{
//         type: String,
//       required: true,
//    },
//    CardDtext1:{
//         type: String,
//       required: true,
//    },
//    CardDtext2:{
//         type: String,
//       required: true,
//    },
//    CardDtext3:{
//         type: String,
//       required: true,
//    },
//    SwitcCardNumber1:{
//         type: String,
//       required: true,
     
//    }, 
//    SwitcCardNumber2:{
//         type: String,
//       required: true,
     
//    }, 
//    SwitcCardHtext2:{
//         type: String,
//       required: true,
     
//    }, 
//       SwitcCardHtext1:{
//         type: String,
//       required: true,
     
//    }, 
//    SwitcCardDtext2:{
//         type: String,
//       required: true,
     
//    }, 
//    SwitcCardDtext1:{
//         type: String,
//       required: true,
     
//    },  