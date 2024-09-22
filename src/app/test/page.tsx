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
    </main>
  );
}
