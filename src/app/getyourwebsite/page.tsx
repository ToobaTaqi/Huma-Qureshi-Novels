"use client";
import React, { useState } from "react";
import Link from "next/link";

const features = [
  {
    icon: "📱",
    title: "موبائل فرینڈلی",
    desc: "آپ کی ویب سائٹ ہر فون اور ٹیبلٹ پر بالکل درست نظر آئے گی",
  },
  {
    icon: "✍️",
    title: "اردو ناولز کے لیے خاص",
    desc: "اردو متن، فونٹ، اور ترتیب — سب کچھ آپ کی زبان کے مطابق",
  },
  {
    icon: "🌐",
    title: "آپ کی اپنی جگہ",
    desc: "فیس بک یا واٹس ایپ پر منحصر نہ رہیں — اپنا مستقل پتہ بنائیں",
  },
  {
    icon: "⚡",
    title: "تیز اور آسان",
    desc: "قارئین کو انتظار نہیں کرنا پڑے گا — فوری لوڈ ہونے والی ویب سائٹ",
  },
  {
    icon: "🎨",
    title: "آپ کی پسند کا ڈیزائن",
    desc: "رنگ، انداز، اور ترتیب — سب آپ کی مرضی کے مطابق",
  },
  {
    icon: "🔗",
    title: "سوشل میڈیا لنکس",
    desc: "فیس بک، انسٹاگرام اور واٹس ایپ — سب ایک جگہ",
  },
];

export default function page() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="py-5 lg:py-10 text-tertiary flex flex-col gap-10 font-urdu" dir="rtl">

      {/* ── Heading ── */}
      <div className="flex flex-col gap-3 text-center px-4">
        <h1 className="leading-snug text-xl sm:text-2xl lg:text-3xl text-tertiary break-words">
          کیا آپ بھی ایک لکھاری ہیں اور
          humaqureshinovels.com
          کی طرح اپنی ایک کسٹم ویب سائٹ بنوانا چاہتے ہیں؟
        </h1>
        
        <p className="text-base lg:text-lg text-secondary max-w-2xl mx-auto leading-loose">
          اپنی کہانیوں کو ایک پیشہ ور انداز میں دنیا کے سامنے پیش کریں
        </p>
      </div>

      {/* ── Feature Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i:any) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`
              flex flex-col gap-2 p-5 rounded-2xl border transition-all duration-300 cursor-default
              ${hovered === i
                ? "border-secondary bg-secondary/10 shadow-lg scale-[1.02]"
                : "border-tertiary/20 bg-white/50"}
            `}
          >
            <span className="text-3xl">{f.icon}</span>
            <h3 className="font-bold text-lg">{f.title}</h3>
            <p className="opacity-70 text-sm leading-loose">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* ── What's included strip ── */}
      <div className="flex flex-col gap-4 bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
        <h2 className="text-xl font-bold">آپ کو ملے گا 🎁</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "مکمل ویب سائٹ - صفحہ اول سے رابطے تک",
            "ناولز اور کہانیوں کا صفحہ",
            "آپ کا تعارف (About) صفحہ",
            "رابطہ (Contact) صفحہ",
            "تیز اور محفوظ ہوسٹنگ",
            "ایک بار بنوائیں - عمر بھر استعمال کریں",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-secondary font-bold mt-1">✓</span>
              <span className="opacity-80 leading-loose">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── CTA Buttons ── */}
      <div className="flex flex-col gap-4 items-center text-center">
        <h2 className="text-xl font-bold">آج ہی رابطہ کریں</h2>
        <p className="opacity-70 text-sm leading-loose max-w-md">
          بس ایک میسج کریں - میں آپ کو پوری تفصیل بتاؤں گی
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="https://wa.me/+923366873934"
            target="_blank"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>📱</span> واٹس ایپ
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=61582432839858"
            target="_blank"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>📘</span> فیس بک
          </Link>
        </div>
      </div>

      {/* ── Footer note ── */}
      {/* <p className="text-center text-sm opacity-50">
         یہ ویب سائٹ بھی میں نے بنائی ہے - آپ کی بھی بنا سکتی ہوں
      </p> */}

    </div>
  );
}