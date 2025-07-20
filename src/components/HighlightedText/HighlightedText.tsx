interface HighlightedText {
  text: string;
  keyword: string;
}

function HighlightedText({ text, keyword }: HighlightedText) {
  if (!keyword) {
    return <>{text}</>;
  }

  const words = keyword
    .trim()
    .split(/\s+/)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  const regex = new RegExp(`(${words.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        words.some((word) => part.toLowerCase() === word.toLowerCase()) ? (
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
