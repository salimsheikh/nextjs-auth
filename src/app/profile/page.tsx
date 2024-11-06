// components/ProfilePage.tsx
"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/profile");
      console.log(res.data);

      console.log(res.data.data._id);

      setData(res.data.data._id);
    } catch (error: any) {
      console.log("error");
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("Logout successfully.");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Profile
        </h2>

        <div className="text-center mt-4">
          {data === "nothing" ? (
            "Profile not found"
          ) : (
            <>
              <Link href={`/profile/${data}`}>{data}Profile</Link>
            </>
          )}
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={logout}
            className="px-4 py-2 text-white font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
          >
            Logout
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={getUserDetails}
            className="px-4 py-2 text-white font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
          >
            User Details
          </button>
        </div>
      </div>
    </div>
  );
}
