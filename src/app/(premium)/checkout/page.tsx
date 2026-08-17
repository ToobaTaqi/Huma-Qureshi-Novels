"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/app/components/Heading";

const PRICING = {
  monthly: { price: 250, label: "Monthly", duration: "1 month" },
  sixMonth: { price: 1350, label: "6-Month", duration: "6 months" },
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedPlan = searchParams.get("plan") || "monthly";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    plan: selectedPlan as "monthly" | "sixMonth",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Update plan if URL changes
  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan === "monthly" || plan === "sixMonth") {
      setFormData((prev) => ({ ...prev, plan }));
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain an uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Password must contain a lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain a number";
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment failed");
      }

      // Payment successful - redirect to user-specific dashboard
      router.push(data.redirect);
    } catch (err: any) {
      setError(err.message || "Payment processing failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanChange = (plan: "monthly" | "sixMonth") => {
    setFormData((prev) => ({ ...prev, plan }));
    router.push(`/checkout?plan=${plan}`, { scroll: false });
  };

  return (
    <div className="text-tertiary py-5 lg:py-10 flex flex-col gap-6 lg:gap-10 max-w-4xl mx-auto">
      <Heading name="Complete Your Purchase" />

      {/* Plan Selection */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handlePlanChange("monthly")}
          className={`border-2 rounded-xl p-4 flex flex-col gap-2 transition ${
            formData.plan === "monthly"
              ? "border-secondary bg-secondary bg-opacity-10"
              : "border-primary"
          }`}
        >
          <span className="font-bold text-lg">Monthly</span>
          <span className="text-2xl font-bold">250 PKR</span>
          <span className="text-sm opacity-75">per month</span>
        </button>
        <button
          onClick={() => handlePlanChange("sixMonth")}
          className={`border-2 rounded-xl p-4 flex flex-col gap-2 transition relative ${
            formData.plan === "sixMonth"
              ? "border-secondary bg-secondary bg-opacity-10"
              : "border-primary"
          }`}
        >
          <div className="absolute top-2 right-2 bg-secondary text-tertiary px-2 py-0.5 rounded text-xs font-bold">
            SAVE 10%
          </div>
          <span className="font-bold text-lg">6-Month</span>
          <span className="text-2xl font-bold">1350 PKR</span>
          <span className="text-sm opacity-75">225 PKR/month</span>
        </button>
      </div>

      {/* Order Summary */}
      <div className="border border-primary rounded-xl p-6 flex flex-col gap-4">
        <h3 className="text-xl font-bold">Order Summary</h3>
        <div className="flex justify-between items-center">
          <span>
            {PRICING[formData.plan].label} Plan ({PRICING[formData.plan].duration})
          </span>
          <span className="font-bold">{PRICING[formData.plan].price} PKR</span>
        </div>
        <div className="border-t border-primary pt-4 flex justify-between items-center">
          <span className="text-lg font-bold">Total</span>
          <span className="text-2xl font-bold text-secondary">
            {PRICING[formData.plan].price} PKR
          </span>
        </div>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className={`border rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:border-secondary ${
                errors.email ? "border-red-500" : "border-primary"
              }`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={`border rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:border-secondary ${
                errors.name ? "border-red-500" : "border-primary"
              }`}
              placeholder="Your name"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className={`border rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:border-secondary ${
                errors.password ? "border-red-500" : "border-primary"
              }`}
              placeholder="Min 8 characters, 1 uppercase, 1 lowercase, 1 number"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
            <p className="text-xs opacity-75">
              This will be your login password for future access
            </p>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, agreeToTerms: e.target.checked }))
            }
            className="mt-1 w-4 h-4"
          />
          <label htmlFor="agreeToTerms" className="text-sm opacity-75">
            I agree to the{" "}
            <Link href="/terms" className="text-secondary underline" target="_blank">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacypolicy" className="text-secondary underline" target="_blank">
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.agreeToTerms && (
          <span className="text-red-500 text-sm -mt-4">{errors.agreeToTerms}</span>
        )}

        {/* Error Message */}
        {error && (
          <div className="border border-red-500 bg-red-500 bg-opacity-10 rounded-lg p-4 text-red-500">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-secondary text-tertiary py-4 px-6 rounded-lg font-bold text-lg hover:opacity-90 active:opacity-75 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Image
                src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1759090353/closetertiary_xkhdd1.png"
                alt="Loading"
                width={20}
                height={20}
                className="animate-spin"
              />
              Processing...
            </span>
          ) : (
            `Pay ${PRICING[formData.plan].price} PKR & Get Premium`
          )}
        </button>
      </form>

      {/* Already have account */}
      <div className="text-center">
        <p className="opacity-75">
          Already have a premium account?{" "}
          <Link href="/login" className="text-secondary underline font-bold">
            Login here
          </Link>
        </p>
      </div>

      {/* Security Notice */}
      <div className="border border-primary rounded-lg p-4 flex items-center gap-3 opacity-75">
        <Image
          src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662209/Logo_ox1c8z.png"
          alt="Secure"
          width={24}
          height={24}
        />
        <p className="text-sm">
          Your payment is secure and encrypted. All premium features will be activated immediately.
        </p>
      </div>
    </div>
  );
}
