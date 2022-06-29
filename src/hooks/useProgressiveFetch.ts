import { useEffect, useRef, useState } from "react";

export type AsyncGenericListItem<T extends { async: boolean }> = T & {
  descendants?: AsyncGenericListItem<T>[];
};

type Cache<T> = {
  [url: string]: T;
};

export const useProgressiveFetch = <T = any>(
  url: string,
  onFetch: (url: string) => Promise<T>,
  initialState: T
): [Cache<T> | undefined, boolean, any] => {
  const [data, setData] = useState<T>(initialState);
  const cache = useRef<Cache<T>>({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    // To fix the race condition, we need to add a cleanup function to ignore stale responses
    let ignore = false;

    const fetchData = async () => {
      if (!ignore && cache.current[url]) {
        return;
      }

      setLoading(true);
      setError(undefined);

      try {
        const response = await onFetch(url);

        if (!ignore) {
          cache.current[url] = response;
        }
      } catch (e) {
        if (!ignore) {
          setError(e);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return [cache.current, isLoading, error];
};

/*
    name: folder1
    decendants: [/path/to/folder/2]

    clicks on folder1
    async loading folder 2
    
*/
