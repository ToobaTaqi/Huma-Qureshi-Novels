import { defineField, defineType } from "sanity";

export const genre = defineType({
    name:"genre",
    type:"document",
    title:"Genre",
    fields:[
        defineField({
            name:"genrename",
            type:"string",
            title:"GenreName"
        }),
        defineField({
            name:"genrecardurl",
            type:"string",
            title:"GenreCardUrl"
        })
    ]
})