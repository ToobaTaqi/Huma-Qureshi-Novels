import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Huma Qureshi for collaborations, ghost writing, story development, content creation, or general inquiries. Based in Karachi, available globally.",
  alternates: { canonical: "https://humaqureshinovels.com/contact" },
};

export default function page() {
  return (
    <div className="flex flex-col gap-6 py-5">
      {/* Hero Banner */}
      <section className="relative mx-4 lg:mx-0 rounded-3xl overflow-hidden bg-[#1E5D50] shadow-2xl">
        <div aria-hidden="true" className="absolute inset-0 -z-0">
          <div className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full bg-[#2F7565]/40 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[200px] rounded-full bg-[#C9A96E]/15 blur-3xl"></div>
        </div>
        <div className="relative text-center px-6 py-12 lg:py-16 flex flex-col items-center gap-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Get In Touch
          </h1>
          <p className="mx-auto max-w-2xl text-base lg:text-lg leading-8 text-white/80">
            Whether you&apos;re a reader, publisher, collaborator, or fellow creative — I&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="flex flex-col gap-6 max-w-4xl mx-auto px-3 sm:px-4">
        {/* Let's Connect */}
        <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#DCCFC2] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 break-words overflow-hidden">
          <h2 className="text-2xl font-extrabold text-[#1E5D50]">Let&apos;s Connect</h2>
          <p className="leading-8">
            Have a project in mind? Want to discuss a story idea, a freelance opportunity, or just want to say hello? Feel free to drop a message. I personally read every email, and I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Collaboration */}
        <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#DCCFC2] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 break-words overflow-hidden">
          <h2 className="text-2xl font-extrabold text-[#1E5D50]">Looking for Professional Collaboration?</h2>
          <p className="leading-8 font-medium">I&apos;m open to:</p>
          <ul className="list-disc ps-6 flex flex-col gap-2 font-medium">
            <li>Freelance writing</li>
            <li>Story development &amp; ghostwriting</li>
            <li>Content creation</li>
            <li>Screenplay or novel consultation</li>
            <li>Guest posts or interviews</li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#DCCFC2] p-6 lg:p-8 flex flex-col gap-5">
          <h2 className="text-2xl font-extrabold text-[#1E5D50]">Contact Details</h2>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1E5D50]/10 flex items-center justify-center shrink-0">
              <Image src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662210/location_o9fddb.png" alt="" width={24} height={24} className="w-6 h-6 object-contain" />
            </div>
            <p className="font-medium">Karachi, Pakistan (Available for global projects remotely)</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1E5D50]/10 flex items-center justify-center shrink-0">
              <Image src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662225/mail_psqetd.png" alt="" width={24} height={24} className="w-6 h-6 object-contain" />
            </div>
            <Link href="mailto:humaqureshiofficial73@gmail.com" className="font-bold text-[#1E5D50] underline underline-offset-4 hover:text-[#C9A96E] transition">
              humaqureshiofficial73@gmail.com
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#1E5D50] rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center gap-5 break-words overflow-hidden">
          <h2 className="text-2xl font-extrabold text-white">Follow Me</h2>
          <div className="flex items-center gap-4">
            <Link href="mailto:humaqureshiofficial73@gmail.com" className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/25 transition">
              <Image src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662225/mail_psqetd.png" alt="Email" width={28} height={28} className="w-7 h-7 object-contain" />
            </Link>
            <Link href="https://youtube.com/@writerhumaqureshinovells?si=UzQ_r6YKbTz-dI2z" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/25 transition">
              <Image src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1758664074/youtube_dpg3g8.png" alt="YouTube" width={28} height={28} className="w-7 h-7 object-contain" />
            </Link>
            <Link href="https://www.facebook.com/share/1FmEpe6h1p/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/25 transition">
              <Image src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662209/facebook_vgnanl.png" alt="Facebook" width={28} height={28} className="w-7 h-7 object-contain" />
            </Link>
            <Link href="https://www.instagram.com/humaqureshiwriter007?igsh=amp6Y3B5OXJvb3lh" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/25 transition">
              <Image src="https://res.cloudinary.com/dx1gryhqc/image/upload/v1758663992/instagram_mxjgaa.png" alt="Instagram" width={28} height={28} className="w-7 h-7 object-contain" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
