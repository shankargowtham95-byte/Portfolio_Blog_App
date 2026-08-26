import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../config/firebase";
import Navbar from "../components/Navbar";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      navigate("/blogs");
    } catch (err) {
      setError(err?.message || "Could not create account.");
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center p-5">
        <form onSubmit={submit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4">
          <h1 className="text-3xl font-bold">Create Account</h1>

          <input className="w-full border p-3 rounded-lg" placeholder="Name"
            value={name} onChange={(e) => setName(e.target.value)} required />

          <input className="w-full border p-3 rounded-lg" placeholder="Email"
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <input className="w-full border p-3 rounded-lg" placeholder="Password"
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <input className="w-full border p-3 rounded-lg" placeholder="Confirm Password"
            type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-semibold">
            Sign Up
          </button>

          <p>
            Already have an account? <Link className="text-sky-600 font-medium" to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}