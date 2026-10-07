import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";

const siteHost = new URL(siteConfig.url).host;

function isExternal(href: string | undefined) {
  if (!href || !/^https?:\/\//i.test(href)) return false;
  try {
    return new URL(href).host !== siteHost;
  } catch {
    return false;
  }
}

/** react-markdown passes its AST node as a prop; keep it off the DOM. */
function domProps<T extends { node?: unknown }>(props: T): Omit<T, "node"> {
  const copy = { ...props };
  delete copy.node;
  return copy;
}

const components: Components = {
  // The page title is the only H1; demote any "# " heading in the body.
  h1: (props) => <h2 {...domProps(props)} />,
  a: (props) =>
    isExternal(props.href) ? (
      <a {...domProps(props)} target="_blank" rel="noopener noreferrer" />
    ) : (
      <a {...domProps(props)} />
    ),
  // eslint-disable-next-line @next/next/no-img-element -- arbitrary author-supplied URLs with unknown sizes
  img: (props) => <img {...domProps(props)} alt={props.alt ?? ""} loading="lazy" />,
};

/** Renders a post's Markdown body with the site's article styles. */
export function BlogBody({ markdown, className }: { markdown: string; className?: string }) {
  return (
    <div className={cn("blog-content", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
