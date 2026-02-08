export const changesSchema = {
  type: "object",
  required: ["results", "page", "total_pages", "total_results"],
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "adult"],
        properties: {
          id: { type: "number" },
          adult: {
            oneOf: [{ type: "boolean" }, { type: "null" }],
          },
        },
        additionalProperties: false,
      },
    },
    page: { type: "number" },
    total_pages: { type: "number" },
    total_results: { type: "number" },
  },
  additionalProperties: false,
};
