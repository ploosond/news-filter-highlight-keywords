interface HighlightedText {
  text: string;
  keyword: string;
}

function HighlightedText({ text, keyword }: HighlightedText) {
  if (!keyword) {
    return <>{text}</>;
  }

  const regex = new RegExp(
    `(${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <mark key={index} style={{ backgroundColor: "yellow" }}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}
export default HighlightedText;
