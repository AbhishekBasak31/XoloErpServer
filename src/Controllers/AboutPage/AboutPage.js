import { AboutXolopage } from "../../Models/AboutPage/AboutPage.js";
import uploadOnCloudinary from "../../Utils/Clodinary.js";

// Helper to handle file retrieval from Multer (works with .fields or .any)
const getFile = (files, fieldName) => {
  if (Array.isArray(files)) {
    return files.find(f => f.fieldname === fieldName);
  }
  return files && files[fieldName] ? files[fieldName][0] : null;
};

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
    const files = req.files || [];

    // 1. Handle Single Images
    const singleImageFields = ["OurStoryImg", "OurMissionImg", "OurVisionImg"];
    for (const field of singleImageFields) {
      const file = getFile(files, field);
      if (file) {
        const upload = await uploadOnCloudinary(file.path);
        if (upload) body[field] = upload.secure_url;
      }
    }

    // 2. Handle Team Members (Array)
    if (body.OurTeam) {
      try {
        const teamMembers = JSON.parse(body.OurTeam);
        for (let i = 0; i < teamMembers.length; i++) {
          const key = `TeamImg_${i}`;
          const file = getFile(files, key);
          if (file) {
            const upload = await uploadOnCloudinary(file.path);
            if (upload) teamMembers[i].Img = upload.secure_url;
          }
        }
        body.OurTeam = teamMembers;
      } catch (e) {
        return res.status(400).json({ message: "Invalid OurTeam JSON format" });
      }
    }

    // 3. Handle Why Choose Us Cards
    if (body.whytochosecards) {
      try {
        body.whytochosecards = JSON.parse(body.whytochosecards);
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
    const files = req.files || [];

    // 1. Handle Single Images
    const singleImageFields = ["OurStoryImg", "OurMissionImg", "OurVisionImg"];
    for (const field of singleImageFields) {
      const file = getFile(files, field);
      if (file) {
        const upload = await uploadOnCloudinary(file.path);
        if (upload) body[field] = upload.secure_url;
      }
    }

    // 2. Handle Team Members
    if (body.OurTeam) {
      try {
        const teamMembers = JSON.parse(body.OurTeam);
        for (let i = 0; i < teamMembers.length; i++) {
          const key = `TeamImg_${i}`;
          const file = getFile(files, key);
          if (file) {
            const upload = await uploadOnCloudinary(file.path);
            if (upload) teamMembers[i].Img = upload.secure_url;
          }
        }
        body.OurTeam = teamMembers;
      } catch (e) {
        return res.status(400).json({ message: "Invalid OurTeam JSON format" });
      }
    }

    // 3. Handle Cards
    if (body.whytochosecards) {
      try {
        body.whytochosecards = JSON.parse(body.whytochosecards);
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
