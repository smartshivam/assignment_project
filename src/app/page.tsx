"use client";

import { auth } from "@/firebase/init";
import { useEffect } from "react";

import { signOut } from "firebase/auth";
import { useState } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/init";
import { useAppSelector } from "@/redux/store";
import { MdDeleteForever } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-hot-toast/headless";
import { useDispatch } from "react-redux";
import { setTodos } from "@/redux/features/todoSlice";

export default function Home() {
  const { currentUser, isLoading } = useAppSelector(
    (state) => state.authReducer
  );
  const { allTodos } = useAppSelector((state) => state.todoSlice);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [editEnable, setEditEnable] = useState(false);
  const [editId, setEditId] = useState("");
  const [loading, setLoading] = useState(true);

  const logout = () => {
    signOut(auth);
  };

  const addTodo = async () => {
    if (content === "") return;

    try {
      if (editEnable) {
        const docref = await updateDoc(doc(db, "todos", editId), {
          content,
        });
      } else {
        const docRef = await addDoc(collection(db, "todos"), {
          content,
          userId: currentUser.uid,
        });
      }

      setContent("");
      setEditId("");
      setEditEnable(false);
    } catch (err: any) {
      toast.error(err.message);
    }

    // console.log("Document written with ID: ", docRef.id);
  };

  useEffect(() => {
    if (currentUser) {
      fetchAllTodos(currentUser.uid);
    }
  }, [currentUser]);
  const fetchAllTodos = (id: string) => {
    console.log("iddd", id);
    setLoading(true);

    const q = query(collection(db, "todos"), where("userId", "==", id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todo: any = [];
      querySnapshot.forEach((doc) => {
        // console.log("docssss", doc.id);
        let data = {
          id: doc.id,
          ...doc.data(),
        };

        // console.log(doc.data());

        todo.push(data);
      });
      dispatch(setTodos(todo));
      setLoading(false);
      //   console.log("Current todos ", todo);
    });
  };

  const editHandle = (content: string, id: string) => {
    setContent(content);
    setEditEnable(true);
    setEditId(id);
  };

  const deleteTodo = async (id: string) => {
    try {
      let result = await deleteDoc(doc(db, "todos", id));
      console.log(result);
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    currentUser && (
      <main className="">
        <div
          className="bg-black text-white w-44 py-4 mt-10 rounded-lg transition-transform hover:bg-black/[0.8] active:scale-90 flex items-center justify-center gap-2 font-medium shadow-md fixed bottom-5 right-5 cursor-pointer"
          onClick={logout}
        >
          <GoSignOut size={18} />
          <span>Logout</span>
        </div>
        <div className="max-w-3xl mx-auto mt-10 p-8">
          <div className="bg-white -m-6 p-3 sticky top-0">
            <div className="flex justify-center flex-col items-center">
              <span className="text-7xl mb-10">📝</span>
              <h1 className="text-5xl md:text-7xl font-bold">ToDo's</h1>
            </div>
            <div className="flex items-center gap-2 mt-10">
              <input
                placeholder={`👋 Hello What to do Today?`}
                type="text"
                className="font-semibold placeholder:text-gray-500 border-[2px] border-black h-[60px] grow shadow-sm rounded-md px-4 focus-visible:outline-yellow-400 text-lg transition-all duration-300"
                autoFocus
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                className="w-[80px] h-[60px] rounded-md bg-black flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-black/[0.8] text-zinc-50"
                onClick={addTodo}
              >
                {editEnable ? "Update" : "Add"}
              </button>
            </div>
          </div>
          <div className="my-10">
            {allTodos.map((item: any, i: number) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between mt-4"
                >
                  <div className="flex items-center gap-3">
                    <label className={"font-medium"}>{item?.content}</label>
                  </div>

                  <div className="flex items-center gap-3">
                    <BiEdit
                      size={24}
                      className="cursor-pointer"
                      onClick={() => editHandle(item.content, item.id)}
                    />
                    <MdDeleteForever
                      size={24}
                      className="text-red-400 hover:text-red-600 cursor-pointer"
                      onClick={() => deleteTodo(item.id)}
                    />
                  </div>
                </div>
              );
            })}

            {allTodos.length === 0 && (
              <span className="text-center w-full block text-2xl font-medium text-gray-400 mt-28">
                {loading ? "Please wait....." : `🥹 You don't have todo's`}
              </span>
            )}
          </div>
        </div>
      </main>
    )
  );
}
