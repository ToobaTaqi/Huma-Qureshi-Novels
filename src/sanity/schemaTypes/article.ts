// import { rule } from "postcss";
import { defineArrayMember, defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  type: "document",
  title: "Article",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "articleslug",
      type: "slug",
      title: "Article Slug",
      options: {
        source: "title", // title se auto-generate hoga
        maxLength: 96, // SEO friendly
      },
    }),
    defineField({
      name: "articlecategory",
      type: "reference",
      title: "Article Category",
      to: {
        type: "articlecategory",
      },
    }),
    defineField({
      name: "articlereleasedate",
      title: "Article Release Date",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        timeStep: 15,
        // calendarTodayLabel: 'Today',
      },
    }),
    defineField({
      name: "cardbannerurl",
      type: "string",
      title: "CardBannerUrl",
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
      name: "views",
      title: "Views",
      type: "number",
      initialValue: 0,
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
