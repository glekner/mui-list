import { useEffect, useRef, useState } from "react";

type useFetchArgs = {
  skip?: boolean;
  options?: RequestInit;
};

type Cache<T> = {
  [url: string]: T;
};

export const useFetch = <T extends { url: string }>(
  item: T,
  onFetch: (item: T) => Promise<T>,
  { skip, options }: useFetchArgs = {}
): [T | undefined, boolean, any] => {
  const [data, setData] = useState<T>();
  const cache = useRef<Cache<T>>({});

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    // To fix the race condition, we need to add a cleanup function to ignore stale responses
    let ignore = false;

    const fetchData = async () => {
      if (!ignore && cache.current[item.url]) {
        return setData(cache.current[item.url]);
      }

      setLoading(true);
      setError(undefined);

      try {
        const response = await onFetch(item);

        if (!ignore) {
          setData(response);
          cache.current[item.url] = response;
        }
      } catch (e) {
        if (!ignore) {
          setError(e);
        }
      } finally {
        setLoading(false);
      }
    };

    if (!skip) {
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, [skip, item.url, options]);

  return [data, isLoading, error];
};
