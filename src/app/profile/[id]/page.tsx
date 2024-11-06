import React from "react";

export default function userProfile({ params }: { params: { id: string } }) {
    const id = params.id;
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Profile Page
        </h2>
        <p className="mt-4 text-center text-green-100 bg-green-500;">{id}</p>
      </div>
    </div>
  );
}
