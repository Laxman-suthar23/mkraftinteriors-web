import { useState, useEffect, useCallback } from "react";

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll(
  callback: () => void,
  options: UseInfiniteScrollOptions = {}
) {
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!isFetching) return;
    
    const fetchMore = async () => {
      await callback();
      setIsFetching(false);
    };

    fetchMore();
  }, [isFetching, callback]);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node || !hasMore) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsFetching(true);
          }
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || "0px",
        }
      );

      observer.observe(node);

      return () => {
        observer.disconnect();
      };
    },
    [hasMore, options.threshold, options.rootMargin]
  );

  return { lastElementRef, isFetching, hasMore, setHasMore };
}
