import { useEffect, useState } from "react";
import { Heart, MessageCircle, Plus, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Blogs() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", imageUrl: "" });
  const [comments, setComments] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAdmin = user?.uid === import.meta.env.VITE_ADMIN_UID;

  async function loadBlogs() {
    try {
      setError("");
      const response = await api.get("/api/blogs");
      setBlogs(response.data);
    } catch {
      setError("Could not load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  async function createBlog(event) {
    event.preventDefault();
    try {
      await api.post("/api/blogs", form);
      setForm({ title: "", content: "", imageUrl: "" });
      setShowForm(false);
      loadBlogs();
    } catch {
      setError("Only the admin can publish blogs.");
    }
  }

  async function toggleLike(id) {
    try {
      await api.post(`/api/blogs/${id}/like`);
      loadBlogs();
    } catch {
      setError("Could not update like.");
    }
  }

  async function deleteBlog(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/api/blogs/${id}`);
      loadBlogs();
    } catch {
      setError("Could not delete the blog.");
    }
  }

  async function addComment(id) {
    if (!comments[id]?.trim()) return;

    try {
      await api.post(`/api/blogs/${id}/comments`, { text: comments[id] });
      setComments({ ...comments, [id]: "" });
      loadBlogs();
    } catch {
      setError("Could not add comment.");
    }
  }

  return (
    <>
      <Navbar blog />

      <main className="max-w-6xl mx-auto p-5 py-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">My Blog App</h1>
            <p className="text-gray-600 mt-2">
              Welcome, {user?.displayName || user?.email}
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-yellow-400 hover:bg-yellow-500 px-5 py-3 rounded-xl flex gap-2 items-center font-semibold"
            >
              <Plus size={18} /> Write Blog
            </button>
          )}
        </div>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">{error}</p>
        )}

        {isAdmin && showForm && (
          <form
            onSubmit={createBlog}
            className="bg-white p-6 rounded-2xl shadow mb-8 space-y-4"
          >
            <h2 className="text-2xl font-semibold">Create Blog</h2>

            <input
              className="w-full border p-3 rounded-lg"
              placeholder="Blog title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <input
              className="w-full border p-3 rounded-lg"
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />

            <textarea
              className="w-full border p-3 rounded-lg"
              rows="6"
              placeholder="Blog content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />

            <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold">
              Publish Blog
            </button>
          </form>
        )}

        {loading ? (
          <p className="text-center py-10">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl text-center">
            No blogs published yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-white rounded-2xl shadow overflow-hidden"
              >
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-52 object-cover"
                  />
                )}

                <div className="p-6">
                  <h2 className="text-2xl font-semibold">{blog.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>

                  <p className="mt-4 leading-7 whitespace-pre-wrap">
                    {blog.content}
                  </p>

                  <div className="flex items-center gap-5 mt-6">
                    {/* Like button */}
                    <button
                      onClick={() => toggleLike(blog._id)}
                      className={`flex items-center gap-2 ${
                        blog.likedBy?.includes(user.uid)
                          ? "text-red-500"
                          : "text-gray-700"
                      }`}
                    >
                      <Heart
                        size={20}
                        fill={
                          blog.likedBy?.includes(user.uid)
                            ? "currentColor"
                            : "none"
                        }
                      />

                      {blog.likes}
                    </button>

                    <span className="flex items-center gap-2 text-gray-700">
                      <MessageCircle size={20} />
                      {blog.comments?.length || 0}
                    </span>

                    {isAdmin && (
                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="ml-auto text-red-500 hover:text-red-700"
                        title="Delete blog"
                      >
                        <Trash2 size={21} />
                      </button>
                    )}
                  </div>

                  <div className="mt-5 space-y-2">
                    {(blog.comments || []).map((comment) => (
                      <p key={comment._id} className="bg-sky-50 p-3 rounded-lg">
                        <b>{comment.name}:</b> {comment.text}
                      </p>
                    ))}

                    <div className="flex gap-2 pt-2">
                      <input
                        className="border p-2 rounded-lg flex-1"
                        placeholder="Write a comment..."
                        value={comments[blog._id] || ""}
                        onChange={(e) =>
                          setComments({
                            ...comments,
                            [blog._id]: e.target.value,
                          })
                        }
                      />
                      <button
                        onClick={() => addComment(blog._id)}
                        className="bg-yellow-400 px-4 rounded-lg font-medium"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
