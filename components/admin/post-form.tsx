"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { slugify } from "@/lib/slugify";
import { Button } from "@/components/ui/button";
import type { PostFormValues } from "@/lib/validation";

type PostRecord = PostFormValues & { id: string };

type FieldErrors = Partial<Record<keyof PostFormValues, string[]>>;

export function PostForm({ post }: { post?: PostRecord }) {
  const router = useRouter();
  const isEditing = Boolean(post);

  const [values, setValues] = useState<PostFormValues>(
    post ?? {
      title: "",
      slug: "",
      excerpt: "",
      body: "",
      status: "DRAFT",
      featuredImageUrl: "",
      socialImageUrl: "",
      seoTitle: "",
      metaDescription: "",
      canonicalUrl: "",
      category: "",
      tags: [],
    }
  );
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [tagsInput, setTagsInput] = useState(post?.tags.join(", ") ?? "");
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<false | "draft" | "publish">(false);
  const [uploading, setUploading] = useState<"featured" | "social" | null>(null);

  function update<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function uploadImage(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url as string;
  }

  async function submit(status: "DRAFT" | "PUBLISHED") {
    setFormError(null);
    setErrors({});
    setSubmitting(status === "PUBLISHED" ? "publish" : "draft");

    const payload: PostFormValues = {
      ...values,
      status,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(
        isEditing ? `/api/admin/posts/${post!.id}` : "/api/admin/posts",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error ?? "Something went wrong saving this post.");
        setErrors(data.fieldErrors ?? {});
        setSubmitting(false);
        return;
      }

      router.push("/admin/posts");
      router.refresh();
    } catch {
      setFormError("Something went wrong saving this post. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-8">
      {formError && (
        <p role="alert" className="border border-danger/40 bg-danger/10 px-3.5 py-2.5 text-sm text-danger">
          {formError}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <AdminField label="Title" error={errors.title?.[0]}>
          <input
            value={values.title}
            onChange={(e) => {
              const title = e.target.value;
              update("title", title);
              if (!slugTouched) update("slug", slugify(title));
            }}
            className={fieldClass(!!errors.title)}
          />
        </AdminField>

        <AdminField label="Slug" error={errors.slug?.[0]}>
          <input
            value={values.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update("slug", slugify(e.target.value));
            }}
            className={fieldClass(!!errors.slug)}
          />
        </AdminField>
      </div>

      <AdminField label="Excerpt" error={errors.excerpt?.[0]}>
        <textarea
          rows={2}
          value={values.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          className={fieldClass(!!errors.excerpt)}
        />
      </AdminField>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-xs font-medium text-ink">Body (Markdown)</label>
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            className="focus-ring font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-signal"
          >
            {preview ? "Edit" : "Preview"}
          </button>
        </div>
        {preview ? (
          <div className="prose min-h-64 border border-line-strong bg-paper-raised p-4 text-sm text-ink">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
              {values.body || "*Nothing to preview yet.*"}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            rows={16}
            value={values.body}
            onChange={(e) => update("body", e.target.value)}
            className={fieldClass(!!errors.body) + " font-mono"}
          />
        )}
        {errors.body?.[0] && <p className="mt-1.5 text-xs text-danger">{errors.body[0]}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <ImageUploadField
          label="Featured image"
          url={values.featuredImageUrl ?? ""}
          uploading={uploading === "featured"}
          onUpload={async (file) => {
            setUploading("featured");
            const url = await uploadImage(file);
            if (url) update("featuredImageUrl", url);
            setUploading(null);
          }}
        />
        <ImageUploadField
          label="Social share image"
          url={values.socialImageUrl ?? ""}
          uploading={uploading === "social"}
          onUpload={async (file) => {
            setUploading("social");
            const url = await uploadImage(file);
            if (url) update("socialImageUrl", url);
            setUploading(null);
          }}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <AdminField label="Category" error={errors.category?.[0]}>
          <input
            value={values.category ?? ""}
            onChange={(e) => update("category", e.target.value)}
            className={fieldClass(!!errors.category)}
          />
        </AdminField>
        <AdminField label="Tags (comma-separated)">
          <input
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className={fieldClass(false)}
          />
        </AdminField>
      </div>

      <div className="border-t border-line pt-6">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">SEO</p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <AdminField label="SEO title" error={errors.seoTitle?.[0]}>
            <input
              value={values.seoTitle ?? ""}
              onChange={(e) => update("seoTitle", e.target.value)}
              className={fieldClass(!!errors.seoTitle)}
            />
          </AdminField>
          <AdminField label="Canonical URL" error={errors.canonicalUrl?.[0]}>
            <input
              value={values.canonicalUrl ?? ""}
              onChange={(e) => update("canonicalUrl", e.target.value)}
              className={fieldClass(!!errors.canonicalUrl)}
              placeholder="https://speedhost360.com/blog/..."
            />
          </AdminField>
        </div>
        <div className="mt-6">
          <AdminField label="Meta description" error={errors.metaDescription?.[0]}>
            <textarea
              rows={2}
              value={values.metaDescription ?? ""}
              onChange={(e) => update("metaDescription", e.target.value)}
              className={fieldClass(!!errors.metaDescription)}
            />
          </AdminField>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
        <Button
          type="button"
          variant="secondary"
          disabled={!!submitting}
          onClick={() => submit("DRAFT")}
        >
          {submitting === "draft" ? "Saving…" : "Save Draft"}
        </Button>
        <Button
          type="button"
          disabled={!!submitting}
          onClick={() => submit("PUBLISHED")}
        >
          {submitting === "publish" ? "Publishing…" : "Publish"}
        </Button>
        {isEditing && values.status === "PUBLISHED" && (
          <Button
            type="button"
            variant="ghost"
            disabled={!!submitting}
            onClick={() => submit("DRAFT")}
          >
            Unpublish
          </Button>
        )}
      </div>
    </form>
  );
}

function fieldClass(hasError: boolean) {
  return `focus-ring w-full border bg-paper px-3.5 py-2.5 text-sm text-ink ${
    hasError ? "border-danger" : "border-line-strong"
  }`;
}

function AdminField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}

function ImageUploadField({
  label,
  url,
  uploading,
  onUpload,
}: {
  label: string;
  url: string;
  uploading: boolean;
  onUpload: (file: File) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink">{label}</label>
      {url && (
        <div className="relative mb-2 h-32 w-full overflow-hidden border border-line">
          <Image src={url} alt="" fill className="object-cover" />
        </div>
      )}
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        }}
        className="block w-full text-xs text-ink-muted file:mr-3 file:border file:border-line-strong file:bg-paper-raised file:px-3 file:py-1.5 file:text-xs"
      />
      {uploading && <p className="mt-1 text-xs text-ink-muted">Uploading…</p>}
    </div>
  );
}
