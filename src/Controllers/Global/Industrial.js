import { IndustrialSec } from "../../Models/Global/Industrialuse.js";
import uploadOnCloudinary from "../../Utils/Clodinary.js";

/* ================= GET ================= */
export const getIndustrialSec = async (req, res) => {
  try {
    const data = await IndustrialSec.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createIndustrialSec = async (req, res) => {
  try {
    const existing = await IndustrialSec.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Section exists. Use Update." });
    }

    const { htext, dtext } = req.body;
    let cardList = [];

    // 1. Parse Card JSON
    if (req.body.card) {
      try {
        cardList = JSON.parse(req.body.card);
      } catch (e) {
        return res.status(400).json({ message: "Invalid card data format" });
      }
    }

    // 2. Handle Dynamic File Uploads (card_img_{index})
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const match = file.fieldname.match(/^card_img_(\d+)$/);
        if (match) {
          const index = parseInt(match[1]);
          if (cardList[index]) {
            const upload = await uploadOnCloudinary(file.path);
            if (upload) {
              cardList[index].img = upload.secure_url;
            }
          }
        }
      }
    }

    const newSec = new IndustrialSec({
      htext,
      dtext,
      card: cardList
    });

    await newSec.save();
    return res.status(201).json({ success: true, message: "Created Successfully", data: newSec });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateIndustrialSec = async (req, res) => {
  try {
    const { htext, dtext } = req.body;
    let cardList = [];

    // 1. Parse Card JSON
    if (req.body.card) {
      try {
        cardList = JSON.parse(req.body.card);
      } catch (e) {
        return res.status(400).json({ message: "Invalid card data format" });
      }
    }

    // 2. Handle Dynamic File Uploads
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const match = file.fieldname.match(/^card_img_(\d+)$/);
        if (match) {
          const index = parseInt(match[1]);
          if (cardList[index]) {
            const upload = await uploadOnCloudinary(file.path);
            if (upload) {
              cardList[index].img = upload.secure_url;
            }
          }
        }
      }
    }

    const updatedSec = await IndustrialSec.findOneAndUpdate(
      {},
      { $set: { htext, dtext, card: cardList } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({ success: true, message: "Updated Successfully", data: updatedSec });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteIndustrialSec = async (req, res) => {
  try {
    await IndustrialSec.findOneAndDelete({});
    return res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};