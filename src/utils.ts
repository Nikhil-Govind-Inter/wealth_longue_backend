export const removeMetaFields = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(removeMetaFields);
  }
  if (obj && typeof obj === "object") {
    const {
      id,
      documentId,
      createdAt,
      updatedAt,
      publishedAt,
      locale,
      ...rest
    } = obj;
    return Object.fromEntries(
      Object.entries(rest).map(([key, value]) => [
        key,
        removeMetaFields(value),
      ]),
    );
  }
  return obj;
};
