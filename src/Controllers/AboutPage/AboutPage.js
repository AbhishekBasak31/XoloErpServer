import { AboutXolopage } from "../../Models/AboutPage/AboutPage.js";
import uploadOnCloudinary from "../../Utils/Clodinary.js";

/* ================= GET ================= */
export const getAboutPage = async (req, res) => {
  try {
    const data = await AboutXolopage.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createAboutPage = async (req, res) => {
  try {
    const existing = await AboutXolopage.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Page data already exists. Use Update." });
    }

    const body = req.body;
    const files = req.files || {};

    // 1. Handle Single Images
    const singleImageFields = ["OurStoryImg", "OurMissionImg", "OurVisionImg"];
    for (const field of singleImageFields) {
      if (files[field] && files[field][0]) {
        const upload = await uploadOnCloudinary(files[field][0].path);
        if (upload) body[field] = upload.secure_url;
      }
    }

    // 2. Handle Team Members (Array)
    let teamMembers = [];
    if (body.OurTeam) {
      try {
        teamMembers = JSON.parse(body.OurTeam);
        // Loop through parsed team to check for uploaded images
        for (let i = 0; i < teamMembers.length; i++) {
          const key = `TeamImg_${i}`;
          if (files[key] && files[key][0]) {
            const upload = await uploadOnCloudinary(files[key][0].path);
            if (upload) teamMembers[i].Img = upload.secure_url;
          }
        }
        body.OurTeam = teamMembers;
      } catch (e) {
        return res.status(400).json({ message: "Invalid OurTeam JSON format" });
      }
    }

    // 3. Handle Why Choose Us Cards (Array) - Text Only
    let cards = [];
    if (body.whytochosecards) {
      try {
        cards = JSON.parse(body.whytochosecards);
        body.whytochosecards = cards;
      } catch (e) {
        return res.status(400).json({ message: "Invalid whytochosecards JSON format" });
      }
    }

    const newPage = new AboutXolopage(body);
    await newPage.save();
    return res.status(201).json({ success: true, message: "About Page Created", data: newPage });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateAboutPage = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const files = req.files || {};

    // 1. Handle Single Images
    const singleImageFields = ["OurStoryImg", "OurMissionImg", "OurVisionImg"];
    for (const field of singleImageFields) {
      if (files[field] && files[field][0]) {
        const upload = await uploadOnCloudinary(files[field][0].path);
        if (upload) body[field] = upload.secure_url;
      }
    }

    // 2. Handle Team Members (Array)
    if (body.OurTeam) {
      try {
        const teamMembers = JSON.parse(body.OurTeam);
        for (let i = 0; i < teamMembers.length; i++) {
          const key = `TeamImg_${i}`;
          // If a new file is uploaded, replace the Img URL
          if (files[key] && files[key][0]) {
            const upload = await uploadOnCloudinary(files[key][0].path);
            if (upload) teamMembers[i].Img = upload.secure_url;
          }
          // If no new file, teamMembers[i].Img remains the old URL passed in JSON
        }
        body.OurTeam = teamMembers;
      } catch (e) {
        return res.status(400).json({ message: "Invalid OurTeam JSON format" });
      }
    }

    // 3. Handle Why Choose Us Cards (Array) - Text Only
    if (body.whytochosecards) {
      try {
        const cards = JSON.parse(body.whytochosecards);
        body.whytochosecards = cards;
      } catch (e) {
        return res.status(400).json({ message: "Invalid whytochosecards JSON format" });
      }
    }

    const updatedPage = await AboutXolopage.findByIdAndUpdate(id, { $set: body }, { new: true });
    
    if (!updatedPage) {
      return res.status(404).json({ success: false, message: "About Page not found" });
    }

    return res.status(200).json({ success: true, message: "About Page Updated", data: updatedPage });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteAboutPage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPage = await AboutXolopage.findByIdAndDelete(id);
    if (!deletedPage) {
      return res.status(404).json({ success: false, message: "About Page not found" });
    }
    return res.status(200).json({ success: true, message: "About Page Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};