export const certificationsSchema = {
  type: "object",
  required: ["certifications"],
  properties: {
    certifications: {
      type: "object",
      additionalProperties: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          required: ["certification", "meaning", "order"],
          properties: {
            certification: { type: "string" },
            meaning: { type: "string" },
            order: { type: "number" },
          },
          additionalProperties: false,
        },
      },
    },
  },
  additionalProperties: false,
};
