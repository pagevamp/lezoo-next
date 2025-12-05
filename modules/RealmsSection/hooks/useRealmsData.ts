import { useState, useEffect } from "react";
import { getRealmsData } from "../apis/realms-data.api";

interface RealmTypeInterface {
  id    : number | string;
  name  : string;
}

interface RealmImageType {
  imageSrc      : string;
  imageSrcSet   : string;
  imageAlt      : string;
  imageRatio    : string | number;
}

export type RealmCard = {
  id                    : number | string;
  title                 : string;
  realmType             : RealmTypeInterface | null;
  realmHouse            : string | null
  featuredImage         : RealmImageType | null;
  realmLogo             : RealmImageType | null;
  hoodTagsData          : string[] | null;
  isUnderConstruction   : boolean;
};

type UseRealmsDataReturn = {
  data          : RealmCard[] | null;
  loading       : boolean;
  error         : string | null;
  currentPage   : number;
  totalPages    : number;
  hasMore       : boolean;
  loadMore      : () => void;
};

export const useRealmsData = (
  filterType: string | null
): UseRealmsDataReturn => {
  const [data, setData] = useState<RealmCard[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const perPage = 6;

  const fetchRealms = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getRealmsData({
        filterType,
        page,
        perPage,
      });

      const realmsArray = Array.isArray(response?.data)
        ? response?.data
        : response?.data.realms || [];

      if (page === 1) {
        setData(realmsArray.length > 0 ? realmsArray : null);
      } else {
        setData((prevData) => [...(prevData ?? []), ...realmsArray]);
      }

      const pages =
        typeof response?.totalPages === "string" && response.totalPages.trim() !== ""
          ? parseInt(response.totalPages, 10) || 1
          : 1;
      setTotalPages(pages);
      setCurrentPage(page);
    } catch (err) {
      setError(`Failed to load realms ${err}`);

      if (page === 1) {
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when filterType changes (reset to page 1)
  useEffect(() => {
    fetchRealms(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      fetchRealms(nextPage);
    }
  };

  const hasMore = currentPage < totalPages;

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    hasMore,
    loadMore: handleLoadMore,
  };
};
