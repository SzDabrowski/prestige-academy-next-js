<<<<<<< HEAD
import {
  CourseData,
  fetchCourseData,
  fetchCoursesData,
} from "@/lib/contentful/serverActions/coursesGroups";
import { draftMode } from "next/headers";
=======
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
>>>>>>> parent of 8211f5e (feat: data fetching for courses groups)

import { Asset } from "contentful";
import { notFound } from "next/navigation";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

// Server Component
export default async function Home() {
<<<<<<< HEAD
  const data = await fetchCourseData({
    preview: draftMode().isEnabled,
    courseTitle: "Grupy zlecone",
  });

  if (!data) {
    notFound();
  }

  const { title, description, image } = data;

  if (!image || !("fields" in image) || !image.fields.file) {
    return <main>Image data is not available</main>;
  }

  const { file } = image.fields;
  if (!file.url || !file.details || !file.details.image) {
    return <main>Invalid image data</main>;
  }

  return (
    <main>
      {/* {blogPosts.map((blogPost, index) => {
        return (
          <div key={blogPost.title}>
            <h1>{blogPost.title}</h1>
            <p>
              {(blogPost.description?.content[0]["content"][0] as any).value}
            </p>
          </div>
        );
      })} */}
      <Image
        src={`https:${file.url}`}
        width={file.details.image.width}
        height={file.details.image.height}
        alt={""}
      />
      {/* <div>{JSON.stringify()}</div> */}
=======
  const posts = await getContent("grupyZaj");

  return (
    <main>
      <Posts posts={posts} />
>>>>>>> parent of 8211f5e (feat: data fetching for courses groups)
    </main>
  );
}
