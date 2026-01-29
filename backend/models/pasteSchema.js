import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      unique: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    maxViews: {
      type: Number,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const paste = mongoose.model("bins", pasteSchema);
export default paste;
