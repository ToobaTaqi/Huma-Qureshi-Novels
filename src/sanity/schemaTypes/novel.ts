// import { rule } from "postcss";
import { defineArrayMember, defineField, defineType } from "sanity";

export const novel = defineType({
  name: "novel",
  type: "document",
  title: "novel",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (rule) => rule.required(),
    }),
    // defineField({
    //   name: "banner",
    //   type: "image",
    //   title: "Banner",
    // }),
    defineField({
      name: "body",
      type: "string",
      title: "Body",
    }),
    defineField({
      name: "writer",
      type: "reference",
      title: "Writer",
      to: {
        type: "writer",
      },
    }),
    defineField({
      name: "genre",
      type: "reference",
      title: "Genre",
      to: {
        type: "genre",
      },
    }),
    defineField({
      name: "trending",
      type: "boolean",
      title: "Trending",
    }),
    defineField({
      name: "latest",
      type: "boolean",
      title: "Latest",
    }),
    defineField({
      name: "popular",
      type: "boolean",
      title: "Popular",
    }),
    defineField({
      name: "pdf",
      type: "file",
      title: "PDF File",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.max(5),
    }),
  ],
});
