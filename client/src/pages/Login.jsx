import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../config/firebase";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/blogs");
    } catch {
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center p-5">
        <form onSubmit={submit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-5">
          <h1 className="text-3xl font-bold">Login</h1>

          <input className="w-full border p-3 rounded-lg" placeholder="Email"
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <input className="w-full border p-3 rounded-lg" placeholder="Password"
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {error && <p className="text-red-600">{error}</p>}

          <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-semibold">
            Login
          </button>

          <p>
            New user? <Link className="text-sky-600 font-medium" to="/signup">Create account</Link>
          </p>
        </form>
      </div>
    </>
  );
}