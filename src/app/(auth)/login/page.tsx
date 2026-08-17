// "use client";

// import React, { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import Heading from "@/app/components/Heading";

// export default function LoginPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Invalid email address";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const result = await signIn("credentials", {
//         email: formData.email,
//         password: formData.password,
//         redirect: false,
//       });

//       if (result?.error) {
//         throw new Error("Invalid email or password");
//       }

//       // Login successful - redirect to callback URL or user dashboard
//       // The middleware will handle redirecting to user-specific dashboard
//       router.push(callbackUrl);
//     } catch (err: any) {
//       setError(err.message || "Login failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="text-tertiary py-5 lg:py-10 flex flex-col gap-6 lg:gap-10 max-w-md mx-auto">
//       <Heading name="Welcome Back" />
//       <p className="opacity-75 text-center">
//         Login to access your premium account
//       </p>

//       {/* Login Form */}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <div className="flex flex-col gap-2">
//           <label className="font-bold">Email Address</label>
//           <input
//             type="email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, email: e.target.value }))
//             }
//             className={`border rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:border-secondary ${
//               errors.email ? "border-red-500" : "border-primary"
//             }`}
//             placeholder="your@email.com"
//           />
//           {errors.email && (
//             <span className="text-red-500 text-sm">{errors.email}</span>
//           )}
//         </div>

//         <div className="flex flex-col gap-2">
//           <label className="font-bold">Password</label>
//           <input
//             type="password"
//             value={formData.password}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, password: e.target.value }))
//             }
//             className={`border rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:border-secondary ${
//               errors.password ? "border-red-500" : "border-primary"
//             }`}
//             placeholder="Enter your password"
//           />
//           {errors.password && (
//             <span className="text-red-500 text-sm">{errors.password}</span>
//           )}
//         </div>

//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             id="rememberMe"
//             checked={formData.rememberMe}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }))
//             }
//             className="w-4 h-4"
//           />
//           <label htmlFor="rememberMe" className="text-sm opacity-75">
//             Remember me for 30 days
//           </label>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="border border-red-500 bg-red-500 bg-opacity-10 rounded-lg p-4 text-red-500 text-sm">
//             {error}
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-secondary text-tertiary py-3 px-6 rounded-lg font-bold hover:opacity-90 active:opacity-75 transition disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? (
//             <span className="flex items-center justify-center gap-2">
//               <Image
//                 src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1759090353/closetertiary_xkhdd1.png"
//                 alt="Loading"
//                 width={20}
//                 height={20}
//                 className="animate-spin"
//               />
//               Logging in...
//             </span>
//           ) : (
//             "Login"
//           )}
//         </button>
//       </form>

//       {/* Don't have account */}
//       <div className="text-center">
//         <p className="opacity-75">
//           Don't have a premium account?{" "}
//           <Link href="/premium" className="text-secondary underline font-bold">
//             Get Premium
//           </Link>
//         </p>
//       </div>

//       {/* Back to home */}
//       <div className="text-center">
//         <Link href="/" className="text-sm opacity-75 hover:text-secondary transition">
//           ← Back to Homepage
//         </Link>
//       </div>
//     </div>
//   );
// }


import Heading2 from '@/app/components/Heading2'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default function page() {
  return (
    <div className='text-center py-10'>
      <Heading2 heading2="Coming soon..."/>
    </div>
  )
}
