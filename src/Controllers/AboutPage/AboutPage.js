import mongoose from "mongoose";
import { AboutPage } from "../../Models/AboutPage/AboutPage.js"; 
import uploadOnCloudinary from "../../Utils/Clodinary.js"; 

const norm = (v) => (typeof v === "string" ? v.trim() : v);

/**
 * HELPER: Upload file if exists
 */
const uploadFile = async (files, key) => {
  if (files && files[key] && files[key][0]) {
    const upload = await uploadOnCloudinary(files[key][0].path);
    return upload?.secure_url || upload?.url;
  }
  return null;
};

/**
 * CREATE AboutPage
 */
export const createAboutPage = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const existing = await AboutPage.findOne().session(session);
    if (existing) {
        await session.abortTransaction();
        return res.status(400).json({ success: false, message: "AboutPage already exists. Use update." });
    }

    const files = req.files || {};
    const body = req.body;

    // 1. Text Fields from Schema
    const textFields = [
      "MainHtext", "MainDtext", "SinceYear",
      "BannerImg1AltTag", "BannerImg2AltTag", "BannerImg3AltTag",
      "underBannerLeftsidetext", "underBannerRightsidetext",
      "OurVisionVideoAltTag", "OurvisionTag", "OurvisionHtext",
      "OurvisionBp1Htext", "OurvisionBp2Htext", "OurvisionBp1Dtext", "OurvisionBp2Dtext",
      "OurvisionNote", "CountersectionHtext",
      "Card1Counter", "Card1CounterHText", "Card1CounterText",
      "Card2Counter", "Card2CounterHText", "Card2CounterText",
      "Card3Counter", "Card3CounterHText", "Card3CounterText",
      "TeamTag", "Teamhtext",
      "CTAHtext", "CTADtext", "CTAButtontext", "CTAButtonUrl"
    ];

    // 2. Image/Video Fields from Schema
    const imageFields = [
      "BannerImg1", "BannerImg2", "BannerImg3",
      "OurVisionVideo", // Video
      "OurvisionBp1Icon", "OurvisionBp2Icon",
      "Card1CounterIcon", "Card2CounterIcon", "Card3CounterIcon"
    ];

    // 3. Team Member Logic (Array of Objects)
    // We expect team data to come as a JSON string for the array or indexed fields if form-data
    // Here assuming JSON string for complex array or manual parsing if using indexed keys
    let teamMembers = [];
    if (body.TeamMember) {
        try {
            teamMembers = JSON.parse(body.TeamMember);
        } catch (e) {
            console.error("Team parsing error", e);
        }
    }

    // 4. Upload Global Images
    const uploads = {};
    for (const imgKey of imageFields) {
      const url = await uploadFile(files, imgKey);
      if (url) uploads[imgKey] = url;
    }

    // 5. Handle Team Images (If uploaded separately as TeamImg_0, TeamImg_1 etc)
    if (teamMembers.length > 0) {
        for (let i = 0; i < teamMembers.length; i++) {
            const teamFileKey = `TeamImg_${i}`; // Frontend must send this key
            const url = await uploadFile(files, teamFileKey);
            if (url) {
                teamMembers[i].Img = url;
            } else if (!teamMembers[i].Img) {
                 // If no new file and no existing string, maybe handle error or allow empty
            }
        }
    }

    // 6. Build Document
    const docData = { ...uploads, TeamMember: teamMembers };
    textFields.forEach(f => { 
        if(body[f] !== undefined) docData[f] = norm(body[f]); 
    });

    const newDoc = new AboutPage(docData);
    await newDoc.save({ session });
    await session.commitTransaction();

    return res.status(201).json({ success: true, message: "AboutPage created", data: newDoc });

  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};

/**
 * GET ALL
 */
export const getAboutPage = async (req, res) => {
  try {
    const data = await AboutPage.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * UPDATE AboutPage
 */
export const updateAboutPage = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const target = await AboutPage.findOne().session(session);

    if (!target) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, message: "No document found" });
    }

    const updates = {};
    const body = req.body || {};
    const files = req.files || {};

    // 1. Text Fields
    const textFields = [
      "MainHtext", "MainDtext", "SinceYear",
      "BannerImg1AltTag", "BannerImg2AltTag", "BannerImg3AltTag",
      "underBannerLeftsidetext", "underBannerRightsidetext",
      "OurVisionVideoAltTag", "OurvisionTag", "OurvisionHtext",
      "OurvisionBp1Htext", "OurvisionBp2Htext", "OurvisionBp1Dtext", "OurvisionBp2Dtext",
      "OurvisionNote", "CountersectionHtext",
      "Card1Counter", "Card1CounterHText", "Card1CounterText",
      "Card2Counter", "Card2CounterHText", "Card2CounterText",
      "Card3Counter", "Card3CounterHText", "Card3CounterText",
      "TeamTag", "Teamhtext",
      "CTAHtext", "CTADtext", "CTAButtontext", "CTAButtonUrl"
    ];

    textFields.forEach(field => {
        if (body[field] !== undefined) {
            updates[field] = norm(body[field]);
        }
    });

    // 2. Image Fields
    const imageFields = [
      "BannerImg1", "BannerImg2", "BannerImg3",
      "OurVisionVideo",
      "OurvisionBp1Icon", "OurvisionBp2Icon",
      "Card1CounterIcon", "Card2CounterIcon", "Card3CounterIcon"
    ];

    for (const field of imageFields) {
        const url = await uploadFile(files, field);
        if (url) updates[field] = url;
    }

    // 3. Team Member Logic (Parsing & Updating)
    if (body.TeamMember) {
        try {
            const parsedTeam = JSON.parse(body.TeamMember);
            // Handle image updates for team members
            for (let i = 0; i < parsedTeam.length; i++) {
                const teamFileKey = `TeamImg_${i}`;
                const url = await uploadFile(files, teamFileKey);
                if (url) {
                    parsedTeam[i].Img = url; // Update with new URL
                }
                // If no new URL, keep the one passed in the JSON (which should be the old URL)
            }
            updates.TeamMember = parsedTeam;
        } catch (e) {
            console.error("Team update parse error", e);
        }
    }

    if (Object.keys(updates).length === 0) {
       await session.abortTransaction();
       return res.status(400).json({ success: false, message: "No changes provided" });
    }

    const updatedDoc = await AboutPage.findByIdAndUpdate(target._id, { $set: updates }, { new: true, session });

    await session.commitTransaction();
    return res.status(200).json({ success: true, message: "Updated successfully", data: updatedDoc });

  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};

/**
 * DELETE
 */
export const deleteAboutPage = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const target = await AboutPage.findOne().session(session);
        
        if(!target) {
            await session.abortTransaction();
            return res.status(404).json({success:false, message: "Not found"});
        }
        await AboutPage.findByIdAndDelete(target._id, {session});
        await session.commitTransaction();
        return res.status(200).json({success:true, message:"Deleted"});
    } catch(err){
        if(session.inTransaction()) await session.abortTransaction();
        return res.status(500).json({success:false, message: err.message});
    } finally {
        session.endSession();
    }
};