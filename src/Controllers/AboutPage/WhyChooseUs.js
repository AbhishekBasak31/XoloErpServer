import { WhyChooseUspage } from "../../Models/AboutPage/Whychooseus.js";
import uploadOnCloudinary from "../../Utils/Clodinary.js";

/* ================= GET ================= */
export const getWhyChooseUsPage = async (req, res) => {
  try {
    const data = await WhyChooseUspage.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createWhyChooseUsPage = async (req, res) => {
  try {
    const existing = await WhyChooseUspage.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Page data already exists. Use Update." });
    }

    const body = req.body;
    const files = req.files || {};

    // 1. Handle Main Image
    if (files.RightsideImg && files.RightsideImg[0]) {
      const upload = await uploadOnCloudinary(files.RightsideImg[0].path);
      if (upload) body.RightsideImg = upload.secure_url;
    }

    // 2. Handle Features Array
    if (body.Features) {
      try {
        const features = JSON.parse(body.Features);
        for (let i = 0; i < features.length; i++) {
          const key = `FeatureIcon_${i}`;
          if (files[key] && files[key][0]) {
            const upload = await uploadOnCloudinary(files[key][0].path);
            if (upload) features[i].Icon = upload.secure_url;
          }
        }
        body.Features = features;
      } catch (e) {
        return res.status(400).json({ message: "Invalid Features JSON format" });
      }
    }

    // 3. Handle Stats Array
    if (body.Stats) {
      try {
        const stats = JSON.parse(body.Stats);
        for (let i = 0; i < stats.length; i++) {
          const key = `StatIcon_${i}`;
          if (files[key] && files[key][0]) {
            const upload = await uploadOnCloudinary(files[key][0].path);
            if (upload) stats[i].Icon = upload.secure_url;
          }
        }
        body.Stats = stats;
      } catch (e) {
        return res.status(400).json({ message: "Invalid Stats JSON format" });
      }
    }

    const newPage = new WhyChooseUspage(body);
    await newPage.save();
    return res.status(201).json({ success: true, message: "Why Choose Us Page Created", data: newPage });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateWhyChooseUsPage = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const files = req.files || {};

    // 1. Handle Main Image
    if (files.RightsideImg && files.RightsideImg[0]) {
      const upload = await uploadOnCloudinary(files.RightsideImg[0].path);
      if (upload) body.RightsideImg = upload.secure_url;
    }

    // 2. Handle Features Array
    if (body.Features) {
      try {
        const features = JSON.parse(body.Features);
        for (let i = 0; i < features.length; i++) {
          const key = `FeatureIcon_${i}`;
          // If new file uploaded, update URL
          if (files[key] && files[key][0]) {
            const upload = await uploadOnCloudinary(files[key][0].path);
            if (upload) features[i].Icon = upload.secure_url;
          }
          // Else keep existing URL from JSON
        }
        body.Features = features;
      } catch (e) {
        return res.status(400).json({ message: "Invalid Features JSON format" });
      }
    }

    // 3. Handle Stats Array
    if (body.Stats) {
      try {
        const stats = JSON.parse(body.Stats);
        for (let i = 0; i < stats.length; i++) {
          const key = `StatIcon_${i}`;
          if (files[key] && files[key][0]) {
            const upload = await uploadOnCloudinary(files[key][0].path);
            if (upload) stats[i].Icon = upload.secure_url;
          }
        }
        body.Stats = stats;
      } catch (e) {
        return res.status(400).json({ message: "Invalid Stats JSON format" });
      }
    }

    const updatedPage = await WhyChooseUspage.findByIdAndUpdate(id, { $set: body }, { new: true });
    
    if (!updatedPage) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    return res.status(200).json({ success: true, message: "Why Choose Us Page Updated", data: updatedPage });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteWhyChooseUsPage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await WhyChooseUspage.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    return res.status(200).json({ success: true, message: "Page Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};