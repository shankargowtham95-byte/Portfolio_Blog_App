const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  uid: String,
  name: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: String,
    likes: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] },
    comments: { type: [commentSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);