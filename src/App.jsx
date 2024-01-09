import {useRef, useState, useCallback, useEffect} from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';

import {updateUserPlaces, fetchUserPlaces} from "./http.js";
import Error from "./components/Error.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null); // [fetchError, setFetchError
  const [updatePlacesError, setUpdatePlacesError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function handleFetchUserPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setFetchError(error.message || "Something went wrong!");
      } finally {
        setIsFetching(false);
      }
    }

    handleFetchUserPlaces()
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(selectedPlace) {
    if (userPlaces.some((place) => place.id === selectedPlace.id)) {
      return;
    }
    
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    updateUserPlaces([selectedPlace, ...userPlaces])
      .catch((error) => {
        setUserPlaces(userPlaces);
        setUpdatePlacesError(error.message || "Something went wrong!");
      })
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      await updateUserPlaces(
        userPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        ));
    } catch (error) {
      setUserPlaces(userPlaces);
      setUpdatePlacesError(error.message || "Something went wrong!");
    }

    setModalIsOpen(false);
  }, [userPlaces]);

  return (
    <>
      <Modal open={!!updatePlacesError} onClose={() => setUpdatePlacesError(null)}>
        {updatePlacesError && (
          <Error
            title="Could not update your places"
            message={updatePlacesError}
            onConfirm={() => setUpdatePlacesError(null)}
          />
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe"/>
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {fetchError && <Error
          title="Could not fetch your places"
          message={fetchError}
        />}
        {!fetchError && <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isLoading={isFetching}
          loadingText={"Loading places..."}
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />}

        <AvailablePlaces onSelectPlace={handleSelectPlace}/>
      </main>
    </>
  );
}

export default App;
