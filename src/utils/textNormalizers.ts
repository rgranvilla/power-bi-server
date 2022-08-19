function convertTextToSlugWithoutSpaces(text: string): string {
  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "_");

  return normalized;
}

export { convertTextToSlugWithoutSpaces };
