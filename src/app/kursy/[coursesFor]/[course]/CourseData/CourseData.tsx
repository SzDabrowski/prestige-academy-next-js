"use server";

import { fetchDanceGroupData } from "@/lib/contentful/serverActions/danceGroups";

export default async function CourseData() {
  const data = fetchDanceGroupData({
    danceGroupTitle: "salsaSolo",
    preview: false,
  });
  console.log(data);

  return <div className=""></div>;
}
