"use client";

import AuthUi from "@/components/AuthUi";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/init";
import { useRouter } from "next/navigation";
import GoogleSignIn from "@/components/GoogleSignIn";

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: any) => {
    e.preventDefault();
    if (user.email.trim() == "") {
      toast.error("Please enter your email");
      return;
    }
    if (user.password.trim() == "") {
      toast.error("Please enter your password");
      return;
    }
    if (!emailRegex.test(user.email)) {
      toast.error("Please enter valid email");
      return;
    }
    if (user.password.length < 6) {
      toast.error("Password should be greater or equal than 6 character");
      return;
    }
    setLoading(true);
    try {
      let result = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      toast.success("login successfully");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <AuthUi>
      <form onSubmit={onLogin}>
        <h1
          className=""
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}
        >
          Login
        </h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={user.email}
          onChange={(val) =>
            setUser((prev) => ({ ...prev, email: val.target.value }))
          }
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={user.password}
          onChange={(val) =>
            setUser((prev) => ({ ...prev, password: val.target.value }))
          }
          placeholder="Enter your password"
        />
        <div className="flex justify-center items-center flex-col m-4">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            disabled={loading}
            style={{ opacity: loading ? 0.4 : "" }}
          >
            Login
          </button>{" "}
          <GoogleSignIn />
        </div>
        <div>
          <Link href="/signup" style={{textDecoration:"underline"}}> Don't have an account? Signup</Link>
        </div>
      </form>
    </AuthUi>
  );
}

export default Login;
