import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { signOut } from "firebase/auth";
import auth from "../config/firebase";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ blog = false }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  async function logout() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <nav className="sticky top-0 z-50 bg-sky-100/95 backdrop-blur border-b border-sky-200">
      <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
        <Link to={blog ? "/blogs" : "/"} className="font-bold text-xl">
          {blog ? "My Blog App" : "My Portfolio"}
        </Link>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>

        <div className={`${open ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-5 md:items-center absolute md:static top-full left-0 w-full md:w-auto bg-sky-100 p-5 md:p-0`}>
          {blog ? (
            <>
              <Link to="/blogs" onClick={() => setOpen(false)}>Blogs</Link>
              <span className="flex items-center gap-2"><User size={17}/>{user?.displayName || user?.email}</span>
              <button onClick={logout} className="flex items-center gap-2"><LogOut size={17}/>Logout</button>
            </>
          ) : (
            <>
              <a href="/#home" onClick={() => setOpen(false)}>Home</a>
              <a href="/#about" onClick={() => setOpen(false)}>About</a>
              <a href="/#contact" onClick={() => setOpen(false)}>Contact</a>
              <Link to="/login" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <LogIn size={17}/>Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}