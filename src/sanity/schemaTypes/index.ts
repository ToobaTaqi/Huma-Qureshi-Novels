import { type SchemaTypeDefinition } from "sanity";
import { novel } from "./novel";
import { writer } from "./writer";
import { genre } from "./genre";
import { comment } from "./comment";
import { novelparent } from "./novelparent";
import { article } from "./article";
import { articlecategory } from "./articlecategory";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [novel, writer, genre, comment, novelparent, article, articlecategory],
};
