"use client";

import { useEffect, useState } from "react"; // Import useEffect and useState
import { TypeDanceGroupFields } from "@/types/typeDanceGroupsSkeleton";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Container } from "@/components/Container/Container";
import { CourseContent } from "./CourseContent/CourseContent";
import { notFound, useParams } from "next/navigation";
import { fetchDanceGroupData } from "@/lib/contentful/serverActions/danceGroups"; // This should be a client-compatible fetching function
import LoadingLogo from "@/components/LoadingLogo/LoadingLogo";

export default function Home() {
  const [data, setData] = useState<TypeDanceGroupFields | null>(null); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const params = useParams(); // Get parameters from the URL

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const groupTitle = String(params.course);
      const fetchedData = await fetchDanceGroupData({
        danceGroupTitle: groupTitle,
        preview: false,
      });
      setData(fetchedData); // Update state with the fetched data
      setLoading(false); // Set loading to false after fetching
    };

    getData(); // Call the async function
  }, [params.coursesFor]); // Run this effect when params.coursesFor changes

  // Show a loading message while the data is being fetched
  if (loading) {
    return <LoadingLogo />;
  }

  // Handle the case where no data is available
  if (!data) {
    notFound();
  }

  return (
    <main>
      <Container>
        <CourseContent data={data} groupFor={String(params.coursesFor)} />{" "}
        {/* Pass the fetched data to CourseContent */}
      </Container>
    </main>
  );
}
