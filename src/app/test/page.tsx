// app/page.tsx (or app/home/page.tsx depending on your structure)
import { getStaticPropsUtil } from "@/lib/action"; // Assuming this fetches your data
import { getAllGrupyZaj, getGrupyZajById } from "@/lib/contentful/api";
import { stringify } from "querystring";
import { ContentfulEntry, getContent } from "@/lib/contentful/client";

interface PostProps {
  posts: ContentfulEntry[];
}

const Posts = ({ posts }: PostProps) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.sys.id}>
          <h2>{post.fields.title}</h2>
          {post.fields.image && (
            <img
              src={post.fields.image.fields.file.url}
              alt={post.fields.image.fields.title}
            />
          )}
          <p>
            {post.fields.description?.content
              .flatMap((p: { content: any[] }) => p.content.map((c) => c.value))
              .join(" ")}
          </p>
        </div>
      ))}
    </div>
  );
};

// Server Component
export default async function Home() {
  const posts = await getContent("grupyZaj");

  return (
    <main>
      <Posts posts={posts} />
    </main>
  );
}
