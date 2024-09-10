import * as contentful from "contentful";

export const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCES_TOKEN || "",
});

export interface ContentfulEntry {
  sys: {
    id: string;
    type: string;
  };
  fields: Record<string, any>; // Adjust this type based on your Contentful data structure
}

export const getContent = async (contentType: string) => {
  try {
    const response = await client.getEntries({ content_type: contentType });
    return response.items;
  } catch (error) {
    console.error(
      `Error fetching entries for content type "${contentType}":`,
      error
    );
    return [];
  }
};
