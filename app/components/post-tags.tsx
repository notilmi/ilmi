import Link from "next/link";

export function PostTags({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${tag.toLowerCase()}`}
          className="text-muted-foreground text-sm hover:underline transition-colors"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
