"use client";

import AuthUi from "@/components/AuthUi";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { db, auth } from "@/firebase/init";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import GoogleSignIn from "@/components/GoogleSignIn";

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function SignUp() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onSignup = async (e: any) => {
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
      let result = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      router.push("/");
      toast.success("Register Successfully");
    } catch (err: any) {
      toast.error(err.message);
      console.log("erro", err.message);
    }
    setLoading(false);
  };

  return (
    <AuthUi>
      <form onSubmit={onSignup}>
        <h1
          className=""
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}
        >
          SignUp
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
            type="submit"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            disabled={loading}
            style={{ opacity: loading ? 0.4 : "" }}
          >
            SignUp
          </button>{" "}
          <GoogleSignIn />
        </div>
        <div>
          <Link href="/login" style={{ textDecoration: "underline" }}>
            {" "}
            Already an account? login
          </Link>
        </div>
      </form>
    </AuthUi>
  );
}

export default SignUp;
