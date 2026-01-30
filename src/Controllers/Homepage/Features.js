import { FeatureSec } from "../../Models/HomePage/Features.js"; // Adjust path
import  uploadOnCloudinary  from "../../Utils/Clodinary.js"; 

/* ================= GET ================= */
export const getFeatureSec = async (req, res) => {
  try {
    const data = await FeatureSec.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createFeatureSec = async (req, res) => {
  try {
    const existing = await FeatureSec.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Section already exists. Use Update." });
    }

    const { Htext, Dtext } = req.body;
    let featuresList = [];

    // 1. Parse Features JSON from request body
    if (req.body.Features) {
        try {
            featuresList = JSON.parse(req.body.Features);
        } catch (e) {
            return res.status(400).json({ message: "Invalid Features JSON format." });
        }
    }

    // 2. Handle Image Uploads (img_0, img_1, etc.)
    if (req.files) {
        for (let i = 0; i < featuresList.length; i++) {
            const fieldName = `img_${i}`;
            if (req.files[fieldName] && req.files[fieldName][0]) {
                const upload = await uploadOnCloudinary(req.files[fieldName][0].path);
                if (upload) {
                    featuresList[i].Img = upload.secure_url;
                }
            }
        }
    }

    const newSec = new FeatureSec({ Htext, Dtext, Features: featuresList });
    await newSec.save();

    return res.status(201).json({ success: true, message: "Feature Section Created", data: newSec });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateFeatureSec = async (req, res) => {
  try {
    const { Htext, Dtext } = req.body;
    let featuresList = [];

    // 1. Parse Features JSON
    if (req.body.Features) {
        try {
            featuresList = JSON.parse(req.body.Features);
        } catch (e) {
            return res.status(400).json({ message: "Invalid Features JSON format." });
        }
    }

    // 2. Handle Image Uploads and update URLs
    if (req.files) {
        for (let i = 0; i < featuresList.length; i++) {
            const fieldName = `img_${i}`;
            if (req.files[fieldName] && req.files[fieldName][0]) {
                const upload = await uploadOnCloudinary(req.files[fieldName][0].path);
                if (upload) {
                    featuresList[i].Img = upload.secure_url;
                }
            }
        }
    }

    const updatedSec = await FeatureSec.findOneAndUpdate(
      {}, 
      { $set: { Htext, Dtext, Features: featuresList } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({ success: true, message: "Feature Section Updated", data: updatedSec });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteFeatureSec = async (req, res) => {
  try {
    await FeatureSec.findOneAndDelete({});
    return res.status(200).json({ success: true, message: "Feature Section Deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
