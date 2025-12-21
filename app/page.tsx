import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Achmad Ilmi <br />
        <span className="text-muted-foreground text-lg">a.k.a Terence</span>
      </h1>
      <p className="mb-4">
        {`Software engineer specializing in Domain Driven Design and Test Driven Development. 
        Passionate about building scalable and maintainable applications. Posting about tech and my life.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
