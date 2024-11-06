// src/app/signup/page.tsx
"use client";

// Importing necessary modules
import Link from "next/link"; // For client-side navigation
import { useEffect, useState } from "react"; // React hooks for state and lifecycle
import axios from "axios"; // For making HTTP requests
import { useRouter } from "next/navigation"; // For router navigation after signup
import CustomNotify from "@/helpers/CustomNotify"; // Custom notification component

// Main function for the Signup form component
export default function SignupForm() {
  const router = useRouter(); // Initialize router for navigation
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  }); // State to hold form data

  const [buttonDisabled, setButtonDisabled] = useState(false); // Button state
  const [alertMessage, setAlertMessage] = useState(""); // Alert message state
  const [alertClass, setAlertClass] = useState(""); // Alert styling class state

  // Function to handle signup logic
  const onSignup = async () => {
    try {
      // Initial alert while request is processed
      setAlertClass("alert-info");
      setAlertMessage("Please wait!");

      // API call to signup endpoint with form data
      const response = await axios.post("/api/users/signup", formData);
      console.log("Signup success", response);

      // Success alert and form reset
      setAlertClass("alert-success");
      setAlertMessage("Successfully registered user.");
      setFormData({ username: "", email: "", password: "" });

      // Redirect to login page upon successful signup
      router.push("/login");
    } catch (error: any) {
      // Handle and log errors
      console.log("Catch Error: ", error.message);
      setAlertClass("alert-danger");
      setAlertMessage(
        "User not registered due to missing required fields or existing email/username."
      );
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (buttonDisabled) {
      setAlertClass("alert-danger");
      setAlertMessage("All fields are required.");
      return false;
    }

    // Simple email validation pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check email format
    if (!formData.email || !emailRegex.test(formData.email)) {
      setAlertClass("alert-danger");
      setAlertMessage("Enter a valid email address.");
      return false;
    }

    // Debug output to verify form data before submission
    console.log(formData);

    // Trigger signup function
    onSignup();
  };

  // Disable or enable submit button based on input fields
  useEffect(() => {
    if (
      formData.email.length > 0 &&
      formData.password.length > 0 &&
      formData.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Sign Up
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2">
          Create an account to get started
        </p>

         {/* Signup form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* Alert notification component */}
          {alertMessage && (
            <CustomNotify alertMessage={alertMessage} alertClass={alertClass} />
          )}

          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Username"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
          >
            {buttonDisabled ? "Signup" : "Signup"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account? &nbsp;
          <Link href="/login" className="text-indigo-600 font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
