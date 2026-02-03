import { AskXolopage } from "../../Models/AboutPage/AskXolo.js";
import uploadOnCloudinary from "../../Utils/Clodinary.js";

/* ================= GET ================= */
export const getAskXoloPage = async (req, res) => {
  try {
    const data = await AskXolopage.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createAskXoloPage = async (req, res) => {
  try {
    const existing = await AskXolopage.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Page data already exists. Use Update." });
    }

    const body = req.body;
    const files = req.files || {};

    // Handle Points Array
    if (body.Points) {
      try {
        const pointsData = JSON.parse(body.Points);
        
        // Iterate through parsed points to handle file uploads
        for (let i = 0; i < pointsData.length; i++) {
          // 1. Handle Point Image
          const imgKey = `PointImage_${i}`;
          if (files[imgKey] && files[imgKey][0]) {
            const upload = await uploadOnCloudinary(files[imgKey][0].path);
            if (upload) pointsData[i].image = upload.secure_url;
          }

          // 2. Handle Point Icon
          const iconKey = `PointIcon_${i}`;
          if (files[iconKey] && files[iconKey][0]) {
            const upload = await uploadOnCloudinary(files[iconKey][0].path);
            if (upload) pointsData[i].icon = upload.secure_url;
          }
        }
        body.Points = pointsData;
      } catch (e) {
        return res.status(400).json({ message: "Invalid Points JSON format" });
      }
    }

    const newPage = new AskXolopage(body);
    await newPage.save();
    return res.status(201).json({ success: true, message: "Ask Xolo Page Created", data: newPage });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateAskXoloPage = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const files = req.files || {};

    // Handle Points Array
    if (body.Points) {
      try {
        const pointsData = JSON.parse(body.Points);
        
        for (let i = 0; i < pointsData.length; i++) {
          // 1. Handle Point Image
          const imgKey = `PointImage_${i}`;
          if (files[imgKey] && files[imgKey][0]) {
            const upload = await uploadOnCloudinary(files[imgKey][0].path);
            if (upload) pointsData[i].image = upload.secure_url;
          }

          // 2. Handle Point Icon
          const iconKey = `PointIcon_${i}`;
          if (files[iconKey] && files[iconKey][0]) {
            const upload = await uploadOnCloudinary(files[iconKey][0].path);
            if (upload) pointsData[i].icon = upload.secure_url;
          }
        }
        body.Points = pointsData;
      } catch (e) {
        return res.status(400).json({ message: "Invalid Points JSON format" });
      }
    }

    const updatedPage = await AskXolopage.findByIdAndUpdate(id, { $set: body }, { new: true });
    
    if (!updatedPage) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    return res.status(200).json({ success: true, message: "Ask Xolo Page Updated", data: updatedPage });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteAskXoloPage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AskXolopage.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    return res.status(200).json({ success: true, message: "Page Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};