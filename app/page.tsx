import { BlogPosts } from "app/components/posts";
import { TagChips } from "app/components/tag-chips";
import { getAllTags } from "app/blog/utils";

export default function Page() {
  let tags = getAllTags();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Terence <br />
        <span className="text-muted-foreground text-lg">(Achmad Ilmi)</span>
      </h1>
      <p className="mb-4">
        {`Software engineer specializing in Domain Driven Design and Test Driven Development.
        Passionate about advocating and building scalable and maintainable applications. Posting about tech and my life.`}
      </p>
      <div className="my-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">My Blog</h2>
          <BlogPosts />
        </div>
      </div>
      <div className="my-8">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-3">Tags</h2>
            <TagChips tags={tags} />
          </div>
        </div>
      </div>
    </section>
  );
}
