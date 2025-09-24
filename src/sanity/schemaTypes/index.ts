import { type SchemaTypeDefinition } from "sanity";
import { novel } from "./novel";
import { writer } from "./writer";
import { genre } from "./genre";
import { comment } from "./comment";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [novel, writer, genre, comment],
};
