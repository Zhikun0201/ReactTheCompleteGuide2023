
import { useFetch } from '../hooks/useFetch.js';
import { fetchAvailablePlaces } from '../http.js';
import { sortPlacesByDistance } from '../loc.js';
import Error from './Error.jsx';
import Places from './Places.jsx';

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {

    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {

  /** SHOULD BE REMOVED BECAUSE OF THE USE OF useFetch
    const [isFetching, setIsFetching] = useState(false);
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [error, setError] = useState();
  SHOULD BE REMOVED BECAUSE OF THE USE OF useFetch **/

  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  /** SHOULD BE REMOVED BECAUSE OF THE USE OF useFetch
    // useEffect(() => {
    //   async function fetchPlaces() {
    //     setIsFetching(true);
  
    //     try {
    //       const places = await fetchAvailablePlaces();
  
  
    //     } catch (error) {
    //       setError({
    //         message:
    //           error.message || 'Could not fetch places, please try again later.',
    //       });
    //       setIsFetching(false);
    //     }
    //   }
  
    //   fetchPlaces();
    // }, []);
  SHOULD BE REMOVED BECAUSE OF THE USE OF useFetch **/

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
