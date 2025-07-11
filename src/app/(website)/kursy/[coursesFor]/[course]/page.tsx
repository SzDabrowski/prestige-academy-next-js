"use client";

import { useEffect, useState } from "react";
import { TypeDanceGroupFields } from "@/types/typeDanceGroupsSkeleton";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Container } from "@/components/Container/Container";
import { CourseContent } from "./CourseContent/CourseContent";
import { notFound, useParams } from "next/navigation";
import { fetchDanceGroupData } from "@/lib/contentful/serverActions/danceGroups";
import LoadingLogo from "@/components/LoadingLogo/LoadingLogo";

/**
 * React component that displays dance group course content based on URL parameters.
 *
 * Fetches dance group data using the `course` route parameter and renders loading, not found, or course content states accordingly.
 */
export default function Home() {
  const [data, setData] = useState<TypeDanceGroupFields | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams(); // Remove await - useParams() is synchronous in client components

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const groupTitle = String(params.course);
        const fetchedData = await fetchDanceGroupData({
          danceGroupTitle: groupTitle,
          preview: false,
        });
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if params are available
    if (params.course) {
      getData();
    }
  }, [params.course, params.coursesFor]); // Fixed dependency array

  // Show a loading message while the data is being fetched
  if (loading) {
    return <LoadingLogo />;
  }

  // Handle the case where no data is available
  if (!data) {
    notFound();
    return null;
  }

  return (
    <main>
      <Container>
        <CourseContent data={data} groupFor={String(params.coursesFor)} />
      </Container>
    </main>
  );
}
