// components/LoginForm.tsx
"use client";

// Importing necessary modules
import Link from "next/link"; // For client-side navigation
import { useEffect, useState } from "react"; // React hooks for state and lifecycle
import axios from "axios"; // For making HTTP requests
import { useRouter } from "next/navigation"; // For router navigation after signup
import CustomNotify from "@/helpers/CustomNotify"; // Custom notification component

// Main function for the Login form component
export default function LoginForm() {
  const router = useRouter(); // Initialize router for navigation
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  }); // State to hold form data

  const [buttonDisabled, setButtonDisabled] = useState(false); // Button state
  const [alertMessage, setAlertMessage] = useState(""); // Alert message state
  const [alertClass, setAlertClass] = useState(""); // Alert styling class state

  // Function to handle signup logic
  const onLogin = async () => {
    try {
      // Initial alert while request is processed
      setAlertClass("alert-info");
      setAlertMessage("Please wait!");

      // API call to signup endpoint with form data
      const response = await axios.post("/api/users/login", formData);
      console.log("Successfully logged in user.", response);

      // Success alert and form reset
      setAlertClass("alert-success");
      setAlertMessage("Successfully logged in user.");
      setFormData({ email: "", password: "" });

      // Redirect to login page upon successful signup
      // router.push("/profile");
    } catch (error: any) {
      // Handle and log errors
      console.log("Catch Error: ", error.message);
      setAlertClass("alert-danger");
      setAlertMessage(
        "User not logged due to missing required fields or email not exists."
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
    onLogin();
  };

  // Disable or enable submit button based on input fields
  useEffect(() => {
    if (
      formData.email.length > 0 &&
      formData.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Log In</h2>
        <p className="text-center text-gray-500 text-sm mt-2">
          Access your account
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* Alert notification component */}
          {alertMessage && (
            <CustomNotify alertMessage={alertMessage} alertClass={alertClass} />
          )}

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
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
            Log In
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?
          <Link
            href="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
