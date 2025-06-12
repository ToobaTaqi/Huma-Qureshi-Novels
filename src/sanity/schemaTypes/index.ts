import { type SchemaTypeDefinition } from "sanity";
import { novel } from "./novel";
import { writer } from "./writer";
import { genre } from "./genre";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [novel, writer, genre],
};
