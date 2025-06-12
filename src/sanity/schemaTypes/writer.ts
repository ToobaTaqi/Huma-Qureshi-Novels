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
  ],
});
