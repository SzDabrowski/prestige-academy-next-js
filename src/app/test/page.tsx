import {
  CourseData,
  fetchCourseData,
  fetchCoursesData,
} from "@/lib/contentful/serverActions/coursesGroups";
import { draftMode } from "next/headers";

import { Asset } from "contentful";
import { notFound } from "next/navigation";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

// Server Component
export default async function Home() {
  const data = await fetchCourseData({
    preview: draftMode().isEnabled,
    courseTitle: "Grupy zlescone",
  });

  if (!data) {
    notFound();
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
        src={`https:${data.image.fields.file.url}`}
        width={data.image.fields.file.details.image.width}
        height={data.image.fields.file.details.image.height}
        alt={""}
      />
      {/* <div>{JSON.stringify()}</div> */}
    </main>
  );
}
