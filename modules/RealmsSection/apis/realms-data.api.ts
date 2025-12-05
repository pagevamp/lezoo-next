import { serverEnv } from "@/env/server.env";

type getRealmsDataProps = {
  filterType: string | null;
  page: number | null;
  perPage: number | null;
};

export const getRealmsData = async ({
  filterType,
  page = 1,
  perPage = 2,
}: getRealmsDataProps) => {
  const baseUrl = serverEnv.REALMS_API;

  const params = new URLSearchParams();
  params.append("page", String(page || 1));
  params.append("per_page", String(perPage || 2));
  params.append("sort", "true");

  if (filterType) {
    params.append("type", filterType);
  }

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const totalPages = response.headers.get("X-WP-TotalPages");
    const data = await response.json();

    return {
      data: data,
      totalPages: totalPages,
    };
  } catch (error) {
    console.error("Failed to fetch realms data:", error);
    throw error;
  }
};
