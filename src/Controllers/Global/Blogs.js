import { BlogSec } from "../../Models/Global/Blogs.js";
import uploadOnCloudinary from "../../Utils/Clodinary.js";

/* ================= GET ================= */
export const getBlogSec = async (req, res) => {
  try {
    const data = await BlogSec.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createBlogSec = async (req, res) => {
  try {
    const existing = await BlogSec.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Section exists. Use Update." });
    }

    const { htext, dtext } = req.body;
    let blogList = [];

    // 1. Parse Blog JSON
    if (req.body.blogs) {
      try {
        blogList = JSON.parse(req.body.blogs);
      } catch (e) {
        return res.status(400).json({ message: "Invalid blog data format" });
      }
    }

    // 2. Handle Dynamic File Uploads (blog_img_{index})
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const match = file.fieldname.match(/^blog_img_(\d+)$/);
        if (match) {
          const index = parseInt(match[1]);
          if (blogList[index]) {
            const upload = await uploadOnCloudinary(file.path);
            if (upload) {
              blogList[index].image = upload.secure_url;
            }
          }
        }
      }
    }

    const newSec = new BlogSec({
      htext,
      dtext,
      blogs: blogList
    });

    await newSec.save();
    return res.status(201).json({ success: true, message: "Created Successfully", data: newSec });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateBlogSec = async (req, res) => {
  try {
    const { htext, dtext } = req.body;
    let blogList = [];

    // 1. Parse Blog JSON
    if (req.body.blogs) {
      try {
        blogList = JSON.parse(req.body.blogs);
      } catch (e) {
        return res.status(400).json({ success: false, message: "Invalid blog data format" });
      }
    }

    // 2. Handle Dynamic File Uploads in Parallel
  // Inside updateBlogSec controller
if (req.files && req.files.length > 0) {
  const uploadPromises = req.files.map(async (file) => {
    const match = file.fieldname.match(/^blog_img_(\d+)$/);
    if (match) {
      const index = parseInt(match[1]);
      
      // IMPORTANT: Check if the blog object exists at this index before uploading
      if (blogList[index]) {
        const upload = await uploadOnCloudinary(file.path);
        if (upload) {
          blogList[index].image = upload.secure_url;
        }
      }
    }
  });
  await Promise.all(uploadPromises);

    }

    // 3. Update Database
    const updatedSec = await BlogSec.findOneAndUpdate(
      {},
      { $set: { htext, dtext, blogs: blogList } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({ 
      success: true, 
      message: "Updated Successfully", 
      data: updatedSec 
    });
  } catch (err) {
    console.error("Update Error:", err); // Log the actual error to Render console
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteBlogSec = async (req, res) => {
  try {
    await BlogSec.findOneAndDelete({});
    return res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};