import pasteSchema from "../models/pasteSchema.js";
import { nanoid } from "nanoid";

// Create a new paste
export const createPaste = async (req, res) => {
  try {
    const { content, expiresMinutes, maxViews } = req.body;
    const shortId = nanoid(8);

    let expiresAt = null;
    if (expiresMinutes) {
      expiresAt = new Date(Date.now() + expiresMinutes * 60 * 1000);
    }
    const newPaste = await pasteSchema.create({
      content,
      shortId,
      expiresAt,
      maxViews,
    });
    await newPaste.save();
    res.status(201).json({
      success: true,
      link: `${process.env.BASE_URL}/paste/${shortId}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a paste by its shortId
export const getPaste = async (req, res) => {
  try {
    // const { id } = req.params;
    const paste = await pasteSchema.findOne({
      shortId: req.params.id,
    });

    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }
    // Check for expiration
    if (paste.expiresAt && paste.expiresAt < new Date()) {
      await pasteSchema.deleteOne({ shortId: id });
      return res.status(410).json({ message: "Paste has expired" });
    }
    // Check for max views
    if (paste.maxViews !== null && paste.views >= paste.maxViews) {
      await pasteSchema.deleteOne({ shortId: id });
      return res
        .status(410)
        .json({ message: "Paste has reached its maximum views" });
    }
    // Increment view count
    paste.views += 1;
    await paste.save();
    res.status(200).json({
      content: paste.content,
      viewsRemaining:
        paste.maxViews !== null ? paste.maxViews - paste.views : null,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server Error" });
  }
};
