import { PostForm } from "@/components/admin/post-form";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">New Post</h1>
      <div className="mt-8">
        <PostForm />
      </div>
    </div>
  );
}
