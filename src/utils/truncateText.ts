const truncateText = (text: string, maxLength: number): string => {
  const defaultText =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum accusantium cum dolor, esse vitae placeat aut error culpa similique molestias sunt commodi Dolorum accusantium cum dolor, esse vitae placeat aut error culpa similique molestias sunt commodi";

  const content = text?.trim().length > 0 ? text : defaultText;

  if (content.length > maxLength) {
    return content.substring(0, maxLength).trimEnd();
  }

  return content;
};

export default truncateText;
