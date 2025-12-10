import { useEffect, useState } from "react";

export default function useMediaQuery(mediaQueryString: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia(mediaQueryString).matches;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString);
    const listener = (event : MediaQueryListEvent) => setMatches(event.matches);

    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [mediaQueryString]);

  return matches;
}
