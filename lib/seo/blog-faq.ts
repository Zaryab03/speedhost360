export type BlogFaqItem = { question: string; answer: string };

const FAQ_HEADING = /^#{2,3}\s*(faqs?|frequently asked questions)\b.*$/i;
const strip = (s: string) =>
  s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Pulls Q&A pairs out of a post's "FAQ" / "Frequently asked questions" section
 * so the FAQPage markup always matches visible content. Questions are the
 * sub-headings (### Q) or bold-only lines (**Q?**) under that heading; the
 * answer is the text that follows, up to the next question or the next
 * same-level heading. Returns [] when the post has no such section.
 */
export function extractBlogFaq(markdown: string): BlogFaqItem[] {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((l) => FAQ_HEADING.test(l.trim()));
  if (start === -1) return [];

  const level = lines[start].trim().match(/^#+/)![0].length;
  const items: BlogFaqItem[] = [];
  let question: string | null = null;
  let answer: string[] = [];

  const flush = () => {
    const text = strip(answer.join(" "));
    if (question && text) items.push({ question, answer: text });
    question = null;
    answer = [];
  };

  for (const raw of lines.slice(start + 1)) {
    const line = raw.trim();
    const heading = line.match(/^(#+)\s+(.*)$/);
    const bold = line.match(/^\*\*(.+?)\*\*$/);
    if (heading && heading[1].length <= level) break;
    if (heading) {
      flush();
      question = strip(heading[2]);
    } else if (bold && bold[1].trim().endsWith("?")) {
      flush();
      question = strip(bold[1]);
    } else if (question) {
      answer.push(line);
    }
  }
  flush();
  return items;
}
