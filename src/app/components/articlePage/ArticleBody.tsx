// import React from "react";
// import { PortableText } from "next-sanity";

// export default function ArticleBody({ text }: { text: any }) {
//   return (
//     // <div className="px-10 lg:px-24 text-tertiary leading-10 whitespace-pre-wrap">
//     //   <p>{text}</p>
//     // </div>
//     <div className="prose prose-invert px-10 lg:px-24 text-tertiary leading-10 whitespace-pre-wrap">
//       <PortableText value={text} />
//     </div>
//   );
// }
"use client";
import React from "react";
import {
  PortableText,
  PortableTextComponents,
} from "@portabletext/react";
import { TypedObject } from "sanity";

interface ArticleBodyProps {
  body: TypedObject[];
}

const components: PortableTextComponents = {
  // ✅ main block renderer (not inside `types`)
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-white my-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-white my-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-white my-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-white my-3">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-secondary pl-4 italic text-gray-300 my-4">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-base text-gray-200 leading-relaxed my-3">
        {children}
      </p>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 text-gray-200 my-3">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 text-gray-200 my-3">
        {children}
      </ol>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-300">{children}</em>
    ),
    underline: ({ children }) => (
      <span className="underline underline-offset-4">{children}</span>
    ),
    highlight: ({ children }) => (
      <span className="bg-secondary text-white px-1 rounded">{children}</span>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline hover:text-blue-300"
      >
        {children}
      </a>
    ),
  },
};

export default function ArticleBody({ body }: ArticleBodyProps) {
  if (!body || body.length === 0)
    return (
      <p className="text-gray-400 text-center italic my-6">
        No content available.
      </p>
    );

  return (
    <div className="prose prose-invert max-w-none px-6 lg:px-24">
      <PortableText value={body} components={components} />
    </div>
  );
}
