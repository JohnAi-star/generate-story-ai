// contact/page.tsx

"use client"; // Required for React hooks to work in Next.js (app directory)
import { useState } from "react";
import emailjs from "emailjs-com"; // Import EmailJS

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.send("service_heiqled", "template_uq600ai", formData, "POMYz9UyA8zUhPYC-"); // EmailJS API call
      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#c3dae9] p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md max-w-4xl w-full">
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>
          {status === "success" && (
            <div className="p-4 mb-4 text-green-800 bg-green-100 rounded-lg">
              Thank you for your message! We’ll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div className="p-4 mb-4 text-red-800 bg-red-100 rounded-lg">
              Oops! Something went wrong. Please try again.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
        <div className="flex-1 flex items-center justify-center bg-blue-500 rounded-r-lg p-6">
          <img
            src="/login.png" // Replace with your image path
            alt="Contact Us"
            className="rounded-lg shadow-md object-cover h-64 w-64"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
