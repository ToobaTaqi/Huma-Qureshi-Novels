import { defineField, defineType } from "sanity";

export const writer = defineType({
  name: "writer",
  type: "document",
  title: "Writer",
  fields: [
    defineField({
      name: "writername",
      type: "string",
      title: "WriterName",
    }),
     defineField({
      name: "writerslug",
      type: "slug",
      title: "Writer Slug",
      options: {
        source: "writername", // title se auto-generate hoga
        maxLength: 96, // SEO friendly
      },
    }),
    defineField({
      name: "writercardimageurl",
      type: "string",
      title: "WriterCardImageUrl",
    }),
  ],
});
