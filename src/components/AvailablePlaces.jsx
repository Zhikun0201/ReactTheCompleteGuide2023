import { useEffect } from 'react';
import Places from './Places.jsx';
import { useState } from 'react';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(true);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true)
      try {
        const places = await fetchAvailablePlaces()

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          )
          setAvailablePlaces(sortedPlaces)
          setIsLoading(false)
        })
        setIsLoading(false)
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places. Please try again later."
        })
        setIsLoading(false)
      }


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