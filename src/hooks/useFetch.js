import { useState, useEffect } from 'react';
export function useFetch(fetchFn, initialValue) {
  // Define the state
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]); // Only re-run the effect if the fetchFn changes

  return { // Return the state
    isFetching,
    error,
    fetchedData,
  };
}