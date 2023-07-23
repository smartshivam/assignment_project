import React from "react";
import { db, auth } from "@/firebase/init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const provider = new GoogleAuthProvider();

function GoogleSignIn() {
  const router = useRouter();
  const signUpWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      toast.success("login successfully");
      router.push("/");
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <div className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group">
      <FcGoogle size={22} />
      <span
        className="font-medium text-black group-hover:text-white"
        onClick={signUpWithGoogle}
      >
        SignIn with Google
      </span>
    </div>
  );
}

export default GoogleSignIn;
