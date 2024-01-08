import { useEffect } from 'react';
import Places from './Places.jsx';
import { useState } from 'react';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(true);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:3000/places')
        const resData = await response.json()

        if (!response.ok) {
          throw new Error("Failed to fetch places.")
        }

        setAvailablePlaces(resData.places)
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places. Please try again later."
        })
      }

      setIsLoading(false)
    }

    fetchPlaces()
  }, [])

  if (error) {
    return <Error title="Failed to fetch places." message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Loading..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
