// Define Types for GraphQL Fields

export interface GrupyZaj {
  sys: {
    id: string;
  };
  name: string;
  description: string;
  schedule: string;
  instructor: {
    name: string;
    email: string;
  };
}

export interface Asset {
  sys: {
    id: string;
  };
  title: string;
  url: string;
  description: string;
}

// General GraphQL Collection Response for Collections (Paginated)
export interface GraphQLCollection<T> {
  items: T[];
  total: number;
}

// Response shape for GrupyZaj query
export interface GrupyZajCollectionResponse {
  data: {
    grupyZajCollection: GraphQLCollection<GrupyZaj>;
  };
}

// Response shape for fetching single GrupyZaj
export interface GrupyZajResponse {
  data: {
    grupyZaj: GrupyZaj;
  };
}

// Response shape for Asset query
export interface AssetCollectionResponse {
  data: {
    assetCollection: GraphQLCollection<Asset>;
  };
}

// Define GraphQL Fields

const GRUPY_ZAJ_GRAPHQL_FIELDS = `
    sys {
      id
    }
    name
    description
    schedule
    instructor {
      name
      email
    }
  `;

const ASSET_GRAPHQL_FIELDS = `
    sys {
      id
    }
    title
    url
    description
  `;

// Generic Fetch Function

async function fetchGraphQL<T>(query: string, preview = false): Promise<T> {
  const response = await fetch(
    `https://preview.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_ACCES_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json();
}

// Helper Function to Extract `GrupyZaj` Entries

function extractGrupyZajEntries(
  fetchResponse: GrupyZajCollectionResponse
): GrupyZaj[] {
  return fetchResponse?.data?.grupyZajCollection?.items || [];
}

// Fetch All `GrupyZaj` Entries

export async function getAllGrupyZaj(
  limit = 3, // Default limit of 3
  isDraftMode = false // Option to return draft content
): Promise<GrupyZaj[]> {
  const query = `query {
      grupyZajCollection(order: schedule_DESC, limit: ${limit}, preview: ${isDraftMode}) {
        items {
          ${GRUPY_ZAJ_GRAPHQL_FIELDS}
        }
      }
    }`;

  const grupyZajEntries = await fetchGraphQL<GrupyZajCollectionResponse>(
    query,
    isDraftMode
  );
  return extractGrupyZajEntries(grupyZajEntries);
}

// Fetch a Single `GrupyZaj` Entry by ID

export async function getGrupyZajById(
  id: string,
  isDraftMode = false
): Promise<GrupyZaj | null> {
  const query = `query {
      grupyZaj(id: "${id}", preview: ${isDraftMode}) {
        ${GRUPY_ZAJ_GRAPHQL_FIELDS}
      }
    }`;

  const response = await fetchGraphQL<GrupyZajResponse>(query, isDraftMode);
  return response?.data?.grupyZaj || null;
}

// Fetch All Asset Entries

export async function getAllAssets(
  limit = 3, // Default limit of 3
  isDraftMode = false // Option to return draft content
): Promise<Asset[]> {
  const query = `query {
      assetCollection(order: sys_id_DESC, limit: ${limit}, preview: ${isDraftMode}) {
        items {
          ${ASSET_GRAPHQL_FIELDS}
        }
      }
    }`;

  const assetEntries = await fetchGraphQL<AssetCollectionResponse>(
    query,
    isDraftMode
  );
  return assetEntries?.data?.assetCollection?.items || [];
}
