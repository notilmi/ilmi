import Link from "next/link";

export function TagChips({ tags }: { tags: string[] }) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${tag.toLowerCase()}`}
          className="px-3 py-1 rounded-full text-sm hover:underline"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
