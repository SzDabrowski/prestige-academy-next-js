import { fetchCoursesData } from "@/lib/contentful/serverActions/coursesGroups";
import { draftMode } from "next/headers";

// Server Component
export default async function Home() {
  const blogPosts = await fetchCoursesData({ preview: draftMode().isEnabled });
  console.log(blogPosts);

  return (
    <main>
      {blogPosts.map((blogPost, index) => {
        return (
          <li key={blogPost.title}>
            <h1>{index}</h1>
            <p>{JSON.stringify(blogPost.description)}</p>
          </li>
        );
      })}
    </main>
  );
}
