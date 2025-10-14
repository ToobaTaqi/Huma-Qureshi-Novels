// import { rule } from "postcss";
import { defineArrayMember, defineField, defineType } from "sanity";

export const novelparent = defineType({
  name: "novelparent",
  type: "document",
  title: "Novel Main Details",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Novel Title",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title", // title se auto-generate hoga
        maxLength: 96, // SEO friendly
      },
    }),
     defineField({
      name: "novelreleasedate",
      title: "Novel Release Date",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        timeStep: 15,
        // calendarTodayLabel: 'Today',
      },
    }),
    defineField({
      name: "noveldescription",
      type: "text",
      title: "Novel Description",
    }),
    defineField({
      name: "descriptionlanguage",
      type: "boolean",
      title: "on this if Description is in urdu",
      initialValue: false,
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
      initialValue: false,
    }),
    defineField({
      name: "latest",
      type: "boolean",
      title: "Latest",
      initialValue: false,
    }),
    defineField({
      name: "popular",
      type: "boolean",
      title: "Popular",
      initialValue: false,
    }),
    defineField({
      name: "pdfurl",
      type: "string",
      title: "PDF Url",
    }),
    defineField({
      name: "youtubeurl",
      type: "string",
      title: "Youtube Url",
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
