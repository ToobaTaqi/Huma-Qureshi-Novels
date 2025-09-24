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
      type: "text",
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
      type: "string",
      title: "PDF Url",
    }),
    defineField({
      name: "bannerimagedesktop",
      type: "string",
      title: "BannerImageDesktop",
    }),
    defineField({
      name: "bannerimagemobile",
      type: "string",
      title: "BannerImageMobile",
    }),
    defineField({
      name: "cardbannerurl",
      type: "string",
      title: "CardBannerUrl",
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

    defineField({
      name: "comment",
      type: "array",
      title: "Comment",
      of: [
        {
          type: "reference",
          to: [{ type: "comment" }],
        },
      ],
    }),
  ],
});
