"use client";

import { auth } from "@/firebase/init";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { setCurrentUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
function Auth({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser, isLoading } = useAppSelector(
    (state) => state.authReducer
  );

  //   console.log("user", currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((curr: any) => {
      dispatch(setCurrentUser(curr));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router.replace("/login");
    }
  }, [currentUser, isLoading]);
  return isLoading ? <Loader /> : children;
}

export default Auth;
