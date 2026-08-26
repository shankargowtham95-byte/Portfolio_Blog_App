const router = require("express").Router();
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");

router.get("/", async (_, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch {
    res.status(500).json({ message: "Could not load blogs" });
  }
});

router.post("/", auth, async (req, res) => {
  if (req.user.uid !== process.env.ADMIN_UID) {
    return res.status(403).json({ message: "Admin only" });
  }

  try {
    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
    });

    res.status(201).json(blog);
  } catch {
    res.status(500).json({ message: "Could not create blog" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user.uid !== process.env.ADMIN_UID) {
    return res.status(403).json({
      message: "Only the admin can delete blogs",
    });
  }

  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog error:", error);

    res.status(500).json({
      message: "Could not delete blog",
    });
  }
});

router.post("/:id/like", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const index = blog.likedBy.indexOf(req.user.uid);

    if (index >= 0) {
      blog.likedBy.splice(index, 1);
      blog.likes = Math.max(0, blog.likes - 1);
    } else {
      blog.likedBy.push(req.user.uid);
      blog.likes += 1;
    }

    await blog.save();
    res.json(blog);
  } catch {
    res.status(500).json({ message: "Could not update like" });
  }
});

router.post("/:id/comments", auth, async (req, res) => {
  try {
    if (!req.body.text?.trim()) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.comments.push({
      uid: req.user.uid,
      name: req.user.name || req.user.email || "User",
      text: req.body.text.trim(),
    });

    await blog.save();
    res.status(201).json(blog);
  } catch {
    res.status(500).json({ message: "Could not add comment" });
  }
});

module.exports = router;
