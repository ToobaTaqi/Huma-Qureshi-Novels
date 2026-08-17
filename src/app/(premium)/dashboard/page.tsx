"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/app/components/Heading";
import Heading2 from "@/app/components/Heading2";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (session?.user?.subscriptionEndDate) {
      const endDate = new Date(session.user.subscriptionEndDate);
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setDaysRemaining(Math.max(0, days));
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader text-5xl lg:text-8xl"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="text-tertiary py-5 lg:py-10 flex flex-col gap-6 lg:gap-10">
      <Heading name="Dashboard" />

      {/* Welcome Section */}
      <div className="border border-primary rounded-xl p-6 shadow-2xl flex flex-col gap-4">
        <h2 className="text-2xl font-bold">
          Welcome back, {session.user.name || "Premium Member"}!
        </h2>
        <p className="opacity-75">
          You're logged in as a premium member
        </p>
      </div>

      {/* Subscription Status */}
      <div className="border border-secondary rounded-xl p-6 shadow-2xl flex flex-col gap-4 bg-secondary bg-opacity-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <Image
              src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662209/Logo_ox1c8z.png"
              alt="Premium"
              width={24}
              height={24}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">Premium Subscription</h3>
            <p className="text-sm opacity-75">
              {session.user.subscriptionPlan === "monthly" ? "Monthly Plan" : "6-Month Plan"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col">
            <span className="text-sm opacity-75">Status</span>
            <span className="font-bold text-green-500">Active</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm opacity-75">Days Remaining</span>
            <span className="font-bold text-secondary">{daysRemaining} days</span>
          </div>
        </div>

        {daysRemaining <= 7 && (
          <div className="border border-yellow-500 bg-yellow-500 bg-opacity-10 rounded-lg p-4 mt-2">
            <p className="text-yellow-500 text-sm font-bold">
              ⚠️ Your subscription expires in {daysRemaining} days. Renew now to continue enjoying premium benefits!
            </p>
            <Link
              href="/checkout"
              className="inline-block mt-3 bg-secondary text-tertiary py-2 px-4 rounded-lg font-bold text-sm hover:opacity-90 transition"
            >
              Renew Subscription
            </Link>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-primary rounded-xl p-6 shadow-2xl flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Image
              src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1760120134/view_1_nlipoq.png"
              alt="Reading"
              width={24}
              height={24}
            />
            <span className="opacity-75">Reading History</span>
          </div>
          <span className="text-3xl font-bold">0</span>
          <Link href="/dashboard" className="text-sm text-secondary hover:underline">
            View all →
          </Link>
        </div>

        <div className="border border-primary rounded-xl p-6 shadow-2xl flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Image
              src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662209/list_nnpk5k.png"
              alt="Bookmarks"
              width={24}
              height={24}
            />
            <span className="opacity-75">Bookmarks</span>
          </div>
          <span className="text-3xl font-bold">0</span>
          <Link href="/dashboard" className="text-sm text-secondary hover:underline">
            View all →
          </Link>
        </div>

        <div className="border border-primary rounded-xl p-6 shadow-2xl flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Image
              src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662209/facebook_vgnanl.png"
              alt="Favorites"
              width={24}
              height={24}
            />
            <span className="opacity-75">Favorites</span>
          </div>
          <span className="text-3xl font-bold">0</span>
          <Link href="/dashboard" className="text-sm text-secondary hover:underline">
            View all →
          </Link>
        </div>
      </div>

      {/* Premium Benefits Reminder */}
      <div className="border border-primary rounded-xl p-6 shadow-2xl flex flex-col gap-4">
        <Heading2 heading2="Your Premium Benefits" />
        <ul className="flex flex-col gap-3 opacity-75">
          <li className="flex items-center gap-2">
            <span className="text-secondary">✓</span>
            Access to all premium novels and episodes
          </li>
          <li className="flex items-center gap-2">
            <span className="text-secondary">✓</span>
            Early access to new episodes
          </li>
          <li className="flex items-center gap-2">
            <span className="text-secondary">✓</span>
            Download PDFs for offline reading
          </li>
          <li className="flex items-center gap-2">
            <span className="text-secondary">✓</span>
            Bookmarks and reading history
          </li>
          <li className="flex items-center gap-2">
            <span className="text-secondary">✓</span>
            Ad-free reading experience
          </li>
        </ul>
      </div>

      {/* Browse Premium Content */}
      <div className="flex flex-col gap-4">
        <Heading2 heading2="Explore Premium Content" />
        <div className="flex gap-4 flex-wrap">
          <Link
            // href="/premium"
            href="/dashboard"
            className="bg-secondary text-tertiary py-3 px-6 rounded-lg font-bold hover:opacity-90 transition"
          >
            Browse Premium Novels
          </Link>
          <Link
            href="/novel"
            className="border border-secondary text-secondary py-3 px-6 rounded-lg font-bold hover:bg-secondary hover:bg-opacity-10 transition"
          >
            Browse Free Novels
          </Link>
        </div>
      </div>

      {/* Account Settings */}
      <div className="border border-primary rounded-xl p-6 shadow-2xl flex flex-col gap-4">
        <Heading2 heading2="Account Settings" />
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center py-2 border-b border-primary">
            <span className="opacity-75">Email</span>
            <span className="font-bold">{session.user.email}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-primary">
            <span className="opacity-75">Name</span>
            <span className="font-bold">{session.user.name || "Not set"}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="opacity-75">Member Since</span>
            <span className="font-bold">
              {new Date().toLocaleDateString("en-GB")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
