"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  Bold,
  Code,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Quote,
  SquareCode,
  Strikethrough,
  Table,
} from "lucide-react";
import { BlogBody } from "@/components/blog/blog-body";
import { cn } from "@/lib/utils";

type Mode = "write" | "split" | "preview";

type Edit = { text: string; selStart: number; selEnd: number };

// Markdown editing helpers. Each takes the current text and selection and
// returns the new text plus where the selection should land.

function wrap(text: string, start: number, end: number, before: string, after: string, placeholder: string): Edit {
  const selected = text.slice(start, end);
  // Toggle off when the selection is already wrapped.
  if (
    text.slice(start - before.length, start) === before &&
    text.slice(end, end + after.length) === after
  ) {
    return {
      text: text.slice(0, start - before.length) + selected + text.slice(end + after.length),
      selStart: start - before.length,
      selEnd: end - before.length,
    };
  }
  const inner = selected || placeholder;
  return {
    text: text.slice(0, start) + before + inner + after + text.slice(end),
    selStart: start + before.length,
    selEnd: start + before.length + inner.length,
  };
}

function prefixLines(text: string, start: number, end: number, prefix: (i: number) => string, pattern: RegExp): Edit {
  const lineStart = text.lastIndexOf("\n", start - 1) + 1;
  const nextBreak = text.indexOf("\n", end);
  const lineEnd = nextBreak === -1 ? text.length : nextBreak;
  const lines = text.slice(lineStart, lineEnd).split("\n");
  const allPrefixed = lines.every((l) => pattern.test(l));
  const next = lines.map((l, i) => (allPrefixed ? l.replace(pattern, "") : prefix(i) + l.replace(pattern, ""))).join("\n");
  return {
    text: text.slice(0, lineStart) + next + text.slice(lineEnd),
    selStart: lineStart,
    selEnd: lineStart + next.length,
  };
}

function insertBlock(text: string, start: number, end: number, block: string, selectFrom = 0, selectLen = 0): Edit {
  const before = text.slice(0, start);
  const after = text.slice(end);
  const lead = before.length === 0 || before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
  const trail = after.startsWith("\n\n") ? "" : after.startsWith("\n") ? "\n" : "\n\n";
  const at = start + lead.length;
  return {
    text: before + lead + block + trail + after,
    selStart: at + selectFrom,
    selEnd: at + selectFrom + selectLen,
  };
}

export function MarkdownEditor({
  value,
  onChange,
  onUploadImage,
  hasError,
}: {
  value: string;
  onChange: (value: string) => void;
  onUploadImage: (file: File) => Promise<string | null>;
  hasError?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<Mode>("split");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const words = value.split(/\s+/).filter(Boolean).length;

  function apply(edit: (text: string, start: number, end: number) => Edit) {
    const el = ref.current;
    if (!el) return;
    if (mode === "preview") setMode("split");
    const result = edit(value, el.selectionStart, el.selectionEnd);
    onChange(result.text);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(result.selStart, result.selEnd);
    });
  }

  const bold = () => apply((t, s, e) => wrap(t, s, e, "**", "**", "bold text"));
  const italic = () => apply((t, s, e) => wrap(t, s, e, "_", "_", "italic text"));
  const strike = () => apply((t, s, e) => wrap(t, s, e, "~~", "~~", "struck text"));
  const inlineCode = () => apply((t, s, e) => wrap(t, s, e, "`", "`", "code"));
  const heading = (level: 2 | 3) =>
    apply((t, s, e) => prefixLines(t, s, e, () => `${"#".repeat(level)} `, /^#{1,6}\s/));
  const bullets = () => apply((t, s, e) => prefixLines(t, s, e, () => "- ", /^[-*]\s/));
  const numbers = () => apply((t, s, e) => prefixLines(t, s, e, (i) => `${i + 1}. `, /^\d+\.\s/));
  const quote = () => apply((t, s, e) => prefixLines(t, s, e, () => "> ", /^>\s?/));
  const codeBlock = () =>
    apply((t, s, e) => {
      const inner = t.slice(s, e) || "code";
      return insertBlock(t, s, e, "```\n" + inner + "\n```", 4, inner.length);
    });
  const divider = () => apply((t, s, e) => insertBlock(t, s, e, "---"));
  const table = () =>
    apply((t, s, e) =>
      insertBlock(t, s, e, "| Column 1 | Column 2 |\n| --- | --- |\n| Cell | Cell |\n| Cell | Cell |", 2, 8),
    );

  function link() {
    const el = ref.current;
    if (!el) return;
    const url = window.prompt("Link URL (e.g. https://speedhost360.com/services/web-hosting or /contact)");
    if (!url) return;
    apply((t, s, e) => {
      const label = t.slice(s, e) || "link text";
      const md = `[${label}](${url.trim()})`;
      return { text: t.slice(0, s) + md + t.slice(e), selStart: s + 1, selEnd: s + 1 + label.length };
    });
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setUploadError(null);
    const url = await onUploadImage(file);
    setUploading(false);
    if (!url) {
      setUploadError("Image upload failed. Try a PNG, JPG, WebP or AVIF under the size limit.");
      return;
    }
    const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
    apply((t, s, e) => insertBlock(t, s, e, `![${alt}](${url})`, 2, alt.length));
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (!(e.metaKey || e.ctrlKey)) return;
    const key = e.key.toLowerCase();
    if (key === "b") {
      e.preventDefault();
      bold();
    } else if (key === "i") {
      e.preventDefault();
      italic();
    } else if (key === "k") {
      e.preventDefault();
      link();
    }
  }

  return (
    <div className={cn("overflow-hidden border bg-paper", hasError ? "border-danger" : "border-line-strong")}>
      <div className="flex flex-wrap items-center gap-0.5 border-b border-line bg-paper-raised px-2 py-1.5">
        <ToolButton label="Heading" onClick={() => heading(2)}>
          <Heading2 size={16} />
        </ToolButton>
        <ToolButton label="Subheading" onClick={() => heading(3)}>
          <Heading3 size={16} />
        </ToolButton>
        <Sep />
        <ToolButton label="Bold (Ctrl+B)" onClick={bold}>
          <Bold size={16} />
        </ToolButton>
        <ToolButton label="Italic (Ctrl+I)" onClick={italic}>
          <Italic size={16} />
        </ToolButton>
        <ToolButton label="Strikethrough" onClick={strike}>
          <Strikethrough size={16} />
        </ToolButton>
        <ToolButton label="Link (Ctrl+K)" onClick={link}>
          <Link2 size={16} />
        </ToolButton>
        <Sep />
        <ToolButton label="Bulleted list" onClick={bullets}>
          <List size={16} />
        </ToolButton>
        <ToolButton label="Numbered list" onClick={numbers}>
          <ListOrdered size={16} />
        </ToolButton>
        <ToolButton label="Quote" onClick={quote}>
          <Quote size={16} />
        </ToolButton>
        <Sep />
        <ToolButton label="Inline code" onClick={inlineCode}>
          <Code size={16} />
        </ToolButton>
        <ToolButton label="Code block" onClick={codeBlock}>
          <SquareCode size={16} />
        </ToolButton>
        <ToolButton label="Table" onClick={table}>
          <Table size={16} />
        </ToolButton>
        <ToolButton label="Divider" onClick={divider}>
          <Minus size={16} />
        </ToolButton>
        <ToolButton label="Insert image" onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
        </ToolButton>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (file) void uploadImage(file);
          }}
        />

        <div className="ml-auto flex border border-line" role="tablist" aria-label="Editor view">
          {(["write", "split", "preview"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                "focus-ring px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em]",
                mode === m ? "bg-ink text-paper" : "text-ink-muted hover:text-ink",
                m === "split" && "hidden lg:block",
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className={cn("grid", mode === "split" && "lg:grid-cols-2")}>
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={"Start writing…\n\nSelect text and use the toolbar to format it."}
          spellCheck
          className={cn(
            "focus-ring min-h-[28rem] w-full resize-y bg-paper p-4 font-mono text-sm leading-relaxed text-ink",
            mode === "preview" && "hidden",
            mode === "split" && "lg:border-r lg:border-line",
          )}
        />
        <div
          className={cn(
            "max-h-[48rem] min-h-[28rem] overflow-y-auto bg-paper-raised p-6",
            mode === "write" && "hidden",
            mode === "split" && "hidden lg:block",
          )}
        >
          {value.trim() ? (
            <BlogBody markdown={value} />
          ) : (
            <p className="text-sm text-ink-muted">The preview of your post appears here.</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-paper-raised px-3 py-1.5 text-[0.6875rem] text-ink-muted">
        <span>
          {words.toLocaleString()} words · {Math.max(1, Math.round(words / 220))} min read
        </span>
        {uploadError ? (
          <span className="text-danger">{uploadError}</span>
        ) : (
          <span>Ctrl+B bold · Ctrl+I italic · Ctrl+K link</span>
        )}
      </div>
    </div>
  );
}

function ToolButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      // Keep the textarea's selection when clicking a toolbar button.
      onMouseDown={(e) => e.preventDefault()}
      className="focus-ring flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-ink-muted hover:bg-paper hover:text-ink disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span aria-hidden className="mx-1 h-5 w-px bg-line" />;
}
