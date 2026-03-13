function parseInline(text) {
  return text
    .replace(
      /\[color:([^\]]+)\](.*?)\[\/color\]/g,
      (_, color, inner) =>
        `<span style="color:${color}">${inner
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>")
          .replace(/__(.*?)__/g, "<u>$1</u>")
          .replace(/~~(.*?)~~/g, "<s>$1</s>")}</span>`,
    )
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/__(.*?)__/g, "<u>$1</u>")
    .replace(/~~(.*?)~~/g, "<s>$1</s>");
}

export function parseContent(text) {
  if (!text) return "";

  const lines = text.split("\n");
  let html = "";

  for (const line of lines) {
    if (line.startsWith("- ")) {
      html += `<li style="margin-left:1.2rem">${parseInline(line.slice(2))}</li>`;
    } else {
      html += parseInline(line) + "<br/>";
    }
  }

  return html;
}
