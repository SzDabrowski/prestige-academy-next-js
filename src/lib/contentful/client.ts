import * as contentful from "contentful";

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
} = process.env;

export const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const previewClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: "preview.contentful.com",
});

export default function contentfulClient({ preview = false }) {
  if (preview) {
    return previewClient;
  }

  return client;
}

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
