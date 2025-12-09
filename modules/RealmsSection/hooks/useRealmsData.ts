import useSWRInfinite from "swr/infinite";
import { useMemo, useCallback, useEffect } from "react";

interface RealmTypeInterface {
  id: number | string;
  name: string;
}

interface RealmImageType {
  imageSrc: string;
  imageSrcSet: string;
  imageAlt: string;
  imageRatio: string | number;
}

export type RealmCard = {
  id: number | string;
  title: string;
  realmType: RealmTypeInterface | null;
  realmHouse: string | null;
  featuredImage: RealmImageType | null;
  realmLogo: RealmImageType | null;
  hoodTagsData: string[] | null;
  isUnderConstruction: boolean;
};

type UseRealmsDataReturn = {
  data: RealmCard[] | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  loadMore: () => void;
  isLoadingMore: boolean;
};

type ApiResponse = {
  data: RealmCard[];
  totalPages: string;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useRealmsData = (
  filterType: string | null
): UseRealmsDataReturn => {
  const perPage = 6;

  const getKey = useCallback(
    (
      pageIndex: number,
      previousPageData: ApiResponse | null
    ) => {
      // Stop when previous page returned no data
      if (
        previousPageData &&
        (!previousPageData.data || previousPageData.data.length === 0)
      ) {
        return null;
      }

      const params = new URLSearchParams();
      params.append("page", String(pageIndex + 1));
      params.append("per_page", String(perPage));
      if (filterType) {
        params.append("type", filterType);
      }
      return `/api/realms?${params.toString()}`;
    },
    [filterType]
  );

  const {
    data: swrData,
    error: swrError,
    size,
    setSize,
    isLoading,
  } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    dedupingInterval: 2000,
  });

  useEffect(() => {
    // Reset pagination when filter changes
    setSize(1);
  }, [filterType, setSize]);

  // Combine data from all pages
  const accumulatedData = useMemo(() => {
    if (!swrData) return [];

    return swrData.reduce<RealmCard[]>((acc, page) => {
      if (page?.data) {
        const realmsArray = Array.isArray(page.data) ? page.data : page.data.realms || [];
        return [...acc, ...realmsArray];
      }
      return acc;
    }, []);
  }, [swrData]);

  // Get total pages from the first response
  const totalPages = useMemo(() => {
    const firstResponse = swrData?.[0];
    if (!firstResponse) return 1;

    const pages =
      typeof firstResponse.totalPages === "string" &&
      firstResponse.totalPages.trim() !== ""
        ? parseInt(firstResponse.totalPages, 10) || 1
        : 1;
    return pages;
  }, [swrData]);

  const isInitialLoading = !swrData && !swrError;
  const isLoadingMore = isLoading && size > 1;
  const error = swrError ? `Failed to load realms: ${swrError.message}` : null;

  const currentPage = size;
  const hasMore = currentPage < totalPages;

  const handleLoadMore = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      setSize((prev) => prev + 1);
    }
  }, [hasMore, isLoadingMore, setSize]);

  return {
    data: accumulatedData.length > 0 ? accumulatedData : null,
    loading: isInitialLoading,
    isLoadingMore,
    error,
    currentPage,
    totalPages,
    hasMore,
    loadMore: handleLoadMore,
  };
};
