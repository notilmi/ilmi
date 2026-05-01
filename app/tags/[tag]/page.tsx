import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getAllTags, getPostsByTag } from "app/blog/utils";

export async function generateStaticParams() {
  let tags = getAllTags();

  return tags.map((tag) => ({
    tag: tag.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  return {
    title: `Posts tagged with "${tag}"`,
    description: `All blog posts tagged with ${tag}`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  let posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <section>
      <div>
        <h1 className="font-semibold text-2xl mb-2 tracking-tighter">
          Posts tagged: <span className="text-muted-foreground">#{tag}</span>
        </h1>
        <p className="text-muted-foreground mb-8">
          {posts.length} {posts.length === 1 ? "post" : "posts"} found
        </p>
      </div>
      <div>
        {posts.map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full grid grid-cols-4 md:flex-row space-x-0 md:space-x-2">
              <p className="text-muted-foreground tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="tracking-tight col-span-3">{post.metadata.title}</p>
            </div>
            {post.metadata.readingTime && (
              <p className="text-muted-foreground text-sm">
                {post.metadata.readingTime} min read
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
